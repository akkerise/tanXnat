import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({
    required: true,
  })
  username: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  password: string;
}
