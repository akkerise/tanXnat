import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import * as path from 'path';
import * as fs from 'fs';
import { Express } from 'express';
import { CBadRequestException } from '@Exception/400.exception';
import { ErrorCodes } from '@/common/constant/error.constant';
import { FileEntity } from '@Entities/file.entity';
import { UserEntity } from '@Entities/user.entity';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Identity } from '@/common/decorator/auth.decorator';
import { LoggerService } from '@/logger/logger.service';

@Injectable()
export class FileService extends TypeOrmCrudService<FileEntity> {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private configService: ConfigService,
    private loggerService: LoggerService,
  ) {
    super(fileRepository);
  }

  private readonly logger = new Logger(FileService?.name);

  async create(files: Express.Multer.File, user: Identity, folderName: string) {
    if (!files) throw new CBadRequestException(ErrorCodes.FILE_UPLOAD_FAILED);
    if (!user) throw new CBadRequestException(ErrorCodes.USER_NOT_FOUND);

    const auth = await this.userRepository.findOne({
      where: { id: user?.id || '' },
    });
    const mimeTypes = files?.mimetype;
    const validMineTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'application/pdf',
    ];

    if (!validMineTypes.includes(String(mimeTypes)))
      throw new CBadRequestException(ErrorCodes.FILE_INVALID);

    const dir = this.configService.get('app.uploadDir');
    const url = this.configService.get('app.urlImg');
    const fileOrgName = files?.originalname;
    const fileExt = path.extname(fileOrgName);
    const time = new Date().getTime();
    const fileName = `${randomUUID()}-${time}-${randomUUID()}${fileExt}`;
    const type = mimeTypes.split('/').pop();

    if (!fs.existsSync(`${dir}/${auth?.username}/${folderName}`)) {
      fs.mkdirSync(`${dir}/${auth?.username || 'member'}/${folderName}`, {
        recursive: true,
      });
    }

    const dirFile = `${dir}/${
      auth?.username || 'member'
    }/${folderName}/${fileName}`;
    fs.writeFileSync(dirFile, files?.buffer);
    const file = new FileEntity();
    file.url = `/${auth?.username || 'member'}/${folderName}/${fileName}`;
    file.ext = fileExt;
    file.type = type;
    file.mime = String(mimeTypes);
    file.name = fileOrgName;
    // if (user) {
    //   file.userId = user?.sub;
    // }
    const res = await this.fileRepository.save(file);
    res.url = url + res.url;
    return res;
  }

  async createAvatar(files: Express.Multer.File, user: Identity) {
    if (!files) throw new CBadRequestException(ErrorCodes.FILE_UPLOAD_FAILED);
    if (!user) throw new CBadRequestException(ErrorCodes.USER_NOT_FOUND);

    const auth = await this.userRepository.findOne({
      where: { id: user?.id || '' },
    });
    const mimeTypes = files?.mimetype;
    const validMineTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'application/pdf',
    ];

    if (!validMineTypes.includes(String(mimeTypes)))
      throw new CBadRequestException(ErrorCodes.FILE_INVALID);

    const dir = this.configService.get('app.uploadDir');
    const url = this.configService.get('app.urlImg');
    const fileOrgName = files?.originalname;
    const fileExt = path.extname(fileOrgName);
    const fileName = `${auth?.username}.png`;
    const type = mimeTypes.split('/').pop();

    if (!fs.existsSync(`${dir}/${auth?.username}/avatar`)) {
      fs.mkdirSync(`${dir}/${auth?.username || 'member'}/avatar`, {
        recursive: true,
      });
    }

    const dirFile = `${dir}/${auth?.username || 'member'}/avatar/${fileName}`;
    fs.writeFileSync(dirFile, files?.buffer);
    const file = new FileEntity();
    file.url = `${url}/${auth?.username || 'member'}/avatar/${fileName}`;
    file.ext = fileExt;
    file.type = type;
    file.mime = String(mimeTypes);
    file.name = fileOrgName;
    // if (user) {
    //   file.userId = user?.sub;
    // }
    return await this.fileRepository.save(file);
  }

  async uploadMultipleFile(
    files: Array<Express.Multer.File>,
    user: UserEntity,
    folderName: string,
  ) {
    try {
      const dataFiles: FileEntity[] = [];
      const dir = await this.configService.get('app.uploadDir');
      for (const file of files) {
        const mimeTypes = file?.mimetype;
        const data = new FileEntity();
        const time = new Date().getTime();
        const fileExt = path.extname(file?.originalname);
        data.path = `${user?.username}/`;
        data.name = `${folderName}-${time}${fileExt}`;
        data.type = mimeTypes;
        data.size = file?.size;
        data.url = `/${user?.username}/${folderName}/${data.name}`;
        const dirFile = `${dir}/${user?.username}/${folderName}/${data.name}`;
        if (!fs.existsSync(`${dir}/${user?.username}/${folderName}`)) {
          fs.mkdirSync(`${dir}/${user?.username}/${folderName}`, {
            recursive: true,
          });
        }
        fs.writeFileSync(dirFile, file?.buffer);
        dataFiles.push(data);
      }
      return await this.fileRepository.insert(dataFiles);
    } catch (error) {
      error = this.loggerService.getLog(error);
      throw new CBadRequestException(
        error.message || ErrorCodes.SOMETHING_WENT_WRONG,
      );
    }
  }

  async deleteByUserId(userId: string) {
    try {
      const files = await this.repo.find({ where: { userId } });
      await this.deleteFiles(files);
      return true;
    } catch (error) {
      error = this.loggerService.getLog(error);
      throw new CBadRequestException(
        error?.response?.msg || ErrorCodes.FILE_CANNOT_DELETE,
      );
    }
  }

  async deleteFiles(files: FileEntity[]) {
    try {
      const dir = this.configService.get('app.uploadDir');
      try {
        files.map((v) => {
          const filePath = path.join(process.cwd(), dir, v?.url);
          fs.rmSync(filePath);
        });
      } catch (error) {
        this.logger.error(error);
      }
      this.logger.debug(`Deleted files with id: => ${files.map((v) => v?.id)}`);
      if (files && files.length > 0) {
        await this.fileRepository.delete({ url: In(files.map((v) => v?.url)) });
      }
    } catch (error) {
      error = this.loggerService.getLog(error);
      throw new CBadRequestException(
        error?.response?.msg || ErrorCodes.FILE_CANNOT_DELETE,
      );
    }
  }

  async getFilesData(payload: string[] | string) {
    try {
      const files = await this.fileRepository.find({
        where: {
          id: In(typeof payload === 'string' ? [payload] : payload),
        },
        select: {
          id: true,
          name: true,
          url: true,
        },
      });
      return files;
    } catch (error) {
      error = this.loggerService.getLog(error);
      throw new CBadRequestException(
        error?.response?.msg || ErrorCodes.SOMETHING_WENT_WRONG,
      );
    }
  }
}
