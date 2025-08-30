import { registerAs } from '@nestjs/config';

export default registerAs('zisMap', () => ({
  url: process.env.ZIS_URL || 'https://test-api.zip-site.com',
}));
