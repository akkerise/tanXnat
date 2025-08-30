import { NotificationEntity } from '@/entities/notification.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { NotificationGateway } from '../notification.gateway';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { CBadRequestException } from '@/common/exception/400.exception';
import { ErrorCodes } from '@/common/constant/error.constant';
import { parseJson } from '@/common/util/json';
import { calculatePageCount } from '@/common/util/string.until';
import {
  GetNotificationsParams,
  GetTotalUnreadNotificationDto,
} from '../dto/req.dto';
import { UpdateIsReadDto } from '../dto/update.dto';
import { SuccessRes } from '@/common/response/success.res';
import { LoggerService } from '@/logger/logger.service';

@Injectable()
export class NotificationService extends TypeOrmCrudService<NotificationEntity> {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notifyRepo: Repository<NotificationEntity>,
    private readonly notifyGateway: NotificationGateway,
    private readonly logger: LoggerService,
  ) {
    super(notifyRepo);
  }

  async sendNotification(
    userId: string,
    type: string,
    title: string,
    body: string,
    data: any,
  ) {
    const notify = new NotificationEntity();
    notify.userId = userId;
    notify.title = title;
    notify.body = body;
    notify.type = type;
    if (data && ['object', 'array'].includes(typeof data)) {
      notify.data = JSON.stringify(data);
    }
    const isSent = await this.notifyGateway.sendTo(
      userId,
      'notification',
      notify,
    );
    notify.isSent = isSent;
    await this.notifyRepo.save(notify);
  }

  async totalUnread(
    userId: string,
    { type }: GetTotalUnreadNotificationDto,
  ): Promise<number> {
    const where: FindOptionsWhere<NotificationEntity> = {
      userId: userId || '',
      isRead: false,
    };

    if (type) {
      where.type = type;
    }
    return await this.repo.count({ where });
  }

  async updateRead(payload: UpdateIsReadDto[]) {
    return await this.notifyRepo.save(payload);
  }

  async readAll(userId: string) {
    await this.repo.update({ userId }, { isRead: true });
  }

  async getNotifications(currentUser?: string, req?: GetNotificationsParams) {
    try {
      const filter: any = {};
      const { type, search, status, ...rest } = req;
      let { currentPage, pageSize } = rest;

      currentPage =
        currentPage && Number(currentPage) > 0 ? Number(currentPage) : 1;
      pageSize = pageSize && Number(pageSize) > 0 ? Number(pageSize) : 25;

      filter.userId = currentUser;
      if (type) {
        filter.type = type;
      }

      if (search) {
        filter.title = Like(`%${search}%`);
      }

      if (status) {
        filter.isRead = status === '1';
      }

      const skip = (currentPage - 1) * pageSize;
      const [notifications, total] = await this.notifyRepo.findAndCount({
        where: filter,
        select: ['id', 'title', 'type', 'body', 'data', 'createdAt', 'isRead'],
        skip,
        take: pageSize,
        order: { createdAt: 'DESC' },
      });

      const promiseGetData = notifications.map(async (v) => {
        const data = parseJson<{ }>(v?.data); 
        return {
          ...v,
          data: { ...data },
          createdAt: v?.createdAt,
        };
      });
      const data = await Promise.all(promiseGetData);

      return {
        data,
        count: total,
        total,
        page: currentPage,
        pageCount: calculatePageCount(pageSize, total),
      };
    } catch (error) {
      throw new CBadRequestException(
        error?.message || ErrorCodes.SOMETHING_WENT_WRONG,
      );
    }
  }

  async getNotification(id?: string) {
    try {
      const notify = await this.notifyRepo.findOne({ where: { id: id || '' } });
      if (!notify) throw new CBadRequestException(ErrorCodes.NOT_FOUND);
      return notify;
    } catch (error) {
      error = this.logger.getLog(error);
      throw new CBadRequestException(
        error?.message || ErrorCodes.SOMETHING_WENT_WRONG,
      );
    }
  }

  async deleteNotifications(ids: string[]): Promise<SuccessRes> {
    const data = await this.repo.delete(ids);
    return {
      success: true,
      data,
    };
  }
}
