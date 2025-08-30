import { FileEntity } from '@/entities/file.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserProfile {
  @ApiProperty({
    required: true,
  })
  id: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  username?: string;

  @ApiProperty()
  avatar?: FileEntity;

  @ApiProperty()
  gender?: string;

  @ApiProperty()
  roleId?: number;

  @ApiProperty()
  birthday?: string;

  @ApiProperty()
  note?: string;
}
