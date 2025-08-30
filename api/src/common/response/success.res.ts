import { ApiProperty } from '@nestjs/swagger';

export class SuccessRes {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  data?: { [key: string]: any };
}
