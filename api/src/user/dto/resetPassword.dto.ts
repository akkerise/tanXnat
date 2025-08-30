import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class ResetPasswordDto {
  @ApiProperty({
    required: true,
    description: 'otp',
  })
  @Expose()
  token: string;

  @ApiProperty({
    required: true,
  })
  @Expose()
  phone: string;

  @ApiProperty({
    required: true,
  })
  @Expose()
  newPassword: string;
}
