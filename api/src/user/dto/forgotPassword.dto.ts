import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class UserForgotPassDto {
  @ApiProperty({
    required: true,
    description: 'phone or id of user',
  })
  @Expose()
  user: string;
}
