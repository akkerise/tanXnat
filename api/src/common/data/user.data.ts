import * as bcrypt from 'bcrypt';
import { USER_SALT_PASSWORD } from '@Constant/user.constant';
import { UserEntity } from '@Entities/user.entity';

export const INIT_USER_DATA: UserEntity[] = [
  {
    username: 'admin',
    password: bcrypt.hashSync('admin@123', USER_SALT_PASSWORD),
    roleId: 1,
  },
];
