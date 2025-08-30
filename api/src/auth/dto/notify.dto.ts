import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from '@Entities/role.entity';

export class UserNotification {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true, nullable: true })
  name: string;

  @ApiProperty({ required: true })
  role: RoleEntity;

  @ApiProperty()
  position?: string;

  @ApiProperty()
  gender?: string;

  @ApiProperty()
  level?: string;

  @ApiProperty()
  team?: string;
}
