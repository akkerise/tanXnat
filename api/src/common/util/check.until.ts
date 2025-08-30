import { Identity } from '../decorator/auth.decorator';

export const checkUserRole = (user: Identity, roles: string[]): boolean => {
  const userRole = user?.role || [];
  if (!userRole) return false;
  if (userRole['all']) return true;
  return roles?.some((r) => userRole[r]);
};

export const fileFilter = (req, file, callback) => {
  const fileTypes = [
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/tiff',
    'image/webp',
  ];
  if (!fileTypes.includes(file?.mimetype)) {
    req.fileValidationError = 'Invalid file type';
    return callback(new Error('Invalid file type'), false);
  }
  return callback(null, true);
};
