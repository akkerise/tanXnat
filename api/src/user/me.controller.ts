import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Identity, TokenGuard } from '@Decorator/auth.decorator';
import { UserEntity } from '@Entities/user.entity';
import { UserService } from './service/user.service';
import { UpdateMeDto } from './dto/update.dto';
import { Crud, CrudAuth, CrudController } from '@dataui/crud';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@Crud({
  model: {
    type: UserEntity,
  },
  routes: {
    only: ['getOneBase', 'updateOneBase'],
    getOneBase: {
      decorators: [UseGuards(TokenGuard)],
    },
    updateOneBase: {
      decorators: [UseGuards(TokenGuard)],
      allowParamsOverride: true,
    },
  },
  dto: {
    update: UpdateMeDto,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      disabled: true,
    },
  },
  query: {
    exclude: ['password'],
  },
})
@CrudAuth({
  filter: (req: { user: Identity }) => {
    const { user } = req;
    return {
      id: user?.id || '',
    };
  },
})
@ApiBearerAuth()
@ApiTags('Me')
@Controller('me')
export class MeController {
  constructor(public service: UserService) {}
  get base(): CrudController<UserEntity> {
    return this;
  }

  @Get('/permissions')
  @UseGuards(TokenGuard)
  async permissions(@CurrentUser() user: Identity): Promise<string[]> {
    return await this.service.getPermissions(user?.id);
  }

  @Patch('/password/reset')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.service.resetPassword(body);
  }

  @Get()
  @UseGuards(TokenGuard)
  async fetchProfile(@CurrentUser() user: Identity) {
    return await this.service.fetchProfile(user.id);
  }
}
