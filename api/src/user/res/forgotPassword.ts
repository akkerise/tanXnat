import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordRes {
  @ApiProperty()
  userId: string;
}
