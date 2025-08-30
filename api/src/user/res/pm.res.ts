import { ApiProperty } from '@nestjs/swagger';

export class UserPMRes {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;
}
