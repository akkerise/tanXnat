import { CODE_TYPE } from '../enum/codeType.enum';
import { nanoid } from './nanoId';

/**
 * @description create code for invite new user using this app or add building group to user account
 * @param type
 * @param username this param need when create code type FAMILY_INVITE
 * @returns {string} code
 */
export const generateInviteCode = (type: CODE_TYPE): string => {
  const result = type + '_' + nanoid(16);
  return result;
};
