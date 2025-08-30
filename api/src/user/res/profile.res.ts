import { UserEntity } from '@/entities/user.entity';
import { FamilyMemberRes } from './family.res';

export class ProfileRes extends UserEntity {
  familyMembers?: FamilyMemberRes[];
  permissions?: string[];
}
