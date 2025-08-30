import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class RefreshDto {
  @IsString()
  @MinLength(5)
  @ApiProperty({
    required: true,
  })
  refreshToken: string;
}
