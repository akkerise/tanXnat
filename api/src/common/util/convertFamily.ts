import { FamilyRes } from '@/user/res/family.res';
import { parseJson } from './json';
import { FAMILY_MEMBER_STATUS } from '../constant/user.constant';

export const convertFamily = (family?: string): FamilyRes[] => {
  return parseJson<FamilyRes[]>(family) || [];
};

export const getActiveFamilyIds = (family: FamilyRes[]): string[] => {
  const res = family.reduce((result, f) => {
    if (f?.status !== FAMILY_MEMBER_STATUS.PENDING) {
      result.push(f.userId);
      return result;
    }
    return result;
  }, [] as string[]);

  return res;
};
