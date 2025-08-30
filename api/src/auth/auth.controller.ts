import { Identity, TokenGuard } from '@Decorator/auth.decorator';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { UserNotification } from './dto/notify.dto';
import { AuthRes } from './res/token.res';
import { AuthService } from './service/auth.service';
import { UserProfile } from './dto/user.res';
import { UserService } from '@/user/service/user.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @ApiOperation({
    description: 'Login with basic user',
  })
  async loginWithUser(
    @Body() payload: LoginDto,
    @Req() request: Request,
  ): Promise<AuthRes> {
    return await this.authService.login(
      payload,
      request.get('user-agent'),
      request.ip,
    );
  }

  @Post('register')
  @ApiOperation({
    description: 'Register by admin',
  })
  async register(@Body() payload: LoginDto): Promise<UserProfile> {
    const createUserDto = {
      username: payload.username,
      password: payload.password,
      active: true,
    };
    return await this.userService.create(createUserDto);
  }

  @Get('me')
  @UseGuards(TokenGuard)
  async checkUser(@Req() req: Request): Promise<Identity> {
    return await this.authService.verifyToken(req.headers.authorization);
  }

  @Post('pub-message')
  @ApiOperation({ description: 'Send notification' })
  @UseGuards(TokenGuard)
  async notification(
    @Body() user: UserNotification,
  ): Promise<{ success: boolean }> {
    await this.authService.notification(user);
    return { success: true };
  }
}
