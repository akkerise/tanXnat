import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CheckPhoneDto {
  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  id?: string;
}

export class CheckUsernameDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  id?: string;
}
