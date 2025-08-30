import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.PORT || 3000,
  isSwagger: process.env.IS_SWAGGER || true,
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  urlImg: process.env.IMAGE_URL || 'http://localhost:3000',
  environment: process.env.ENV,
}));
