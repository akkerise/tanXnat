import { Identity } from '@/common/decorator/auth.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthRes {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  expiresIn: number;

  @ApiProperty()
  expiresAt: number;

  user: Identity;
}
