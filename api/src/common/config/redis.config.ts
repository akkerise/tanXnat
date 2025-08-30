import { registerAs } from '@nestjs/config';

export default registerAs<IRedisConfig>('redis', async () => ({
  host: process.env.REDIS_HOST || '10.10.31.29',
  port: +process.env.REDIS_PORT || 6379,
  db: +process.env.REDIS_DB || 0,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
}));

export interface IRedisConfig {
  host: string;
  port: number;
  db: number;
  username?: string;
  password?: string;
}
