import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VerifyLivingCodeDto {
  @ApiProperty()
  @IsNotEmpty()
  code: string;
}
