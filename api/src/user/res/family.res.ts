import { FAMILY_MEMBER_STATUS } from '@/common/constant/user.constant';
import { UserEntity } from '@/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FamilyRes {
  @ApiProperty()
  userId?: string;

  @ApiProperty()
  roleFamily?: string;

  @ApiProperty()
  status?: FAMILY_MEMBER_STATUS;
}

export class FamilyMemberRes extends UserEntity {
  @ApiProperty()
  roleFamily?: string;
}
