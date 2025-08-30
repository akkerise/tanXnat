export const USER_SALT_PASSWORD = 10;
export const MORE_THAN_HALF_WORK = 11;
export const ONE_AND_A_HALF_WORK = 33;
export const MAX_OFF_DAYS_IN_YEAR = 12;

export const IgnoreAccount = ['admin', 'hrm'];

export const IgnoreDepartment = ['ADMIN'];

export enum UserRoles {
  ADMIN = 1,
  MEMBER = 2,
}

export enum UserGender {
  Female = 'FEMALE',
  Male = 'MALE',
  Unknown = 'UNKNOWN',
}

export enum UserError {
  IS_ACTIVE_OR_NOT_FOUND_USER = 1,
  INVALID_PASSWORD = 2,
}

export enum UserSuccess {
  UPDATE_PASSWORD_DONE = 1,
}

export enum FAMILY_MEMBER_STATUS {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
}
