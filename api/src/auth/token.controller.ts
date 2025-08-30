import { Controller, Body, Delete, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RefreshDto } from './dto/refresh.dto';
import { SessionService } from './service/session.service';
import { LogoutDto } from './dto/logout.dto';
import { AuthRes } from './res/token.res';

@Controller('token')
@ApiTags('Auth')
export class TokenController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('refresh')
  @ApiOperation({
    description: 'Refresh new token',
  })
  async loginWithUser(@Query() payload: RefreshDto): Promise<AuthRes> {
    return await this.sessionService.refreshToken(payload);
  }

  @Delete('')
  @ApiOperation({
    description: 'Logout token',
  })
  async deleteToken(@Body() payload: LogoutDto) {
    await this.sessionService.deleteToken(payload);
    return {
      success: true,
    };
  }
}
