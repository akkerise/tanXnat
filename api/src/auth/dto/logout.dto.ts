import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LogoutDto {
  @IsString()
  @MinLength(5)
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  token: string;
}
