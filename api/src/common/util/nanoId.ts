import { makeRandomString } from './string.until';

export const nanoid = (t = 21) => {
  const id = makeRandomString(t, 'Aa#');
  return id;
};
