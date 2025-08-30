import { isBoolean } from 'class-validator';

export const checkBoolean = (value?: any) => {
  if (isBoolean(value)) {
    return value;
  }
  if (value === undefined || (value !== 'true' && value !== 'false')) {
    return null;
  }
  return value === 'true';
};
