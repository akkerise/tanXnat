import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { CurrentUser, Identity, TokenGuard } from '@Decorator/auth.decorator';
import { RolesGuard } from '@Decorator/role.decorator';
import { HasPerm } from '@Decorator/hasPerm.decorator';
import { RolePerms } from '@Constant/role.constant';
import { FileService } from './service/file.service';

@ApiTags('Files')
@Controller('files')
@ApiBearerAuth()
export class FilesController {
  constructor(private fileService: FileService) {}

  @Post('/upload/:folderName')
  @UseGuards(TokenGuard, RolesGuard)
  @HasPerm(RolePerms.UPLOAD_FILE)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'file image/pdf',
        },
      },
      required: ['file'],
    },
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() files: Express.Multer.File,
    @CurrentUser() user: Identity,
    @Param('folderName') folderName: string,
  ) {
    return await this.fileService.create(files, user, folderName);
  }

  @Post('/avatar')
  @UseGuards(TokenGuard, RolesGuard)
  @HasPerm(RolePerms.UPLOAD_FILE)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'file image/pdf',
        },
      },
      required: ['file'],
    },
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async createAvatar(
    @UploadedFile() files: Express.Multer.File,
    @CurrentUser() user: Identity,
  ) {
    return await this.fileService.createAvatar(files, user);
  }

  @Get()
  @UseGuards(TokenGuard, RolesGuard)
  @HasPerm(RolePerms.GET_FILE)
  async getFiles(@Query('ids') ids: string[]) {
    return await this.fileService.getFilesData(ids);
  }
}
