import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, Identity, TokenGuard } from '@Decorator/auth.decorator';
import { NotificationService } from './service/notification.service';
import { NotificationEntity } from '@/entities/notification.entity';
import { Crud, CrudAuth, CrudController, Override } from '@dataui/crud';
import {
  GetNotificationsParams,
  GetTotalUnreadNotificationDto,
} from './dto/req.dto';
import { UpdateIsReadDto } from './dto/update.dto';
import { LoggerService } from '@/logger/logger.service';
import { CBadRequestException } from '@/common/exception/400.exception';
import { ErrorCodes } from '@/common/constant/error.constant';

@ApiTags('Notification')
@Controller('notifications')
@ApiBearerAuth()
@Crud({
  model: {
    type: NotificationEntity,
  },
  routes: {
    only: ['getManyBase'],
    getManyBase: {
      decorators: [UseGuards(TokenGuard)],
    },
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
  },
  query: {
    exclude: ['deletedAt'],
    sort: [
      {
        field: 'createdAt',
        order: 'DESC',
      },
    ],
    join: {
      userProjects: {
        eager: true,
      },
    },
    alwaysPaginate: true,
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: Identity) => {
    return {
      userId: user.id,
    };
  },
})
export class NotificationController {
  constructor(
    public readonly service: NotificationService,
    private loggerService: LoggerService,
  ) {}

  get base(): CrudController<NotificationEntity> {
    return this;
  }

  @Get('count/unread')
  @UseGuards(TokenGuard)
  async countUnread(
    @CurrentUser() user: Identity,
    @Query() payload: GetTotalUnreadNotificationDto,
  ) {
    try {
      const count = await this.service.totalUnread(user?.id, payload);
      return {
        count,
      };
    } catch (error) {
      error = this.loggerService.getLog(error);
      throw new CBadRequestException(
        error.message || ErrorCodes.SOMETHING_WENT_WRONG,
      );
    }
  }

  @Delete()
  @UseGuards(TokenGuard)
  async readAll(@CurrentUser() user: Identity) {
    await this.service.readAll(user.id);
    return {
      success: true,
    };
  }

  @Override('getManyBase')
  @UseGuards(TokenGuard)
  async getNotifications(
    @CurrentUser() user: Identity,
    @Query() req: GetNotificationsParams,
  ) {
    return this.service.getNotifications(user.id, req);
  }

  @Patch('update/many')
  @UseGuards(TokenGuard)
  async updateMany(@Body() body: UpdateIsReadDto[]) {
    try {
      return await this.service.updateRead(body);
    } catch (error) {
      error = this.loggerService.getLog(error);
      throw new CBadRequestException(
        error.message || ErrorCodes.SOMETHING_WENT_WRONG,
      );
    }
  }

  @Delete('delete/many')
  @UseGuards(TokenGuard)
  async deleteMany(@Body() body: string[]) {
    try {
      return await this.service.deleteNotifications(body);
    } catch (error) {
      error = this.loggerService.getLog(error);
      throw new CBadRequestException(
        error.message || ErrorCodes.SOMETHING_WENT_WRONG,
      );
    }
  }
}
