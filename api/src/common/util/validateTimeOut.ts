import { compareAsc } from 'date-fns';

/**
 * @returns {boolean} if true is time still in timeout running
 */
export function validateTimeOut(data: string) {
  if (!data) return false;
  const arr = data?.split('_');
  const time = arr[arr?.length - 1];
  const currentTime = new Date();
  const isActive = compareAsc(currentTime, new Date(time));
  return isActive < 0;
}
