import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DATABASE_TYPE || 'postgres',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || 'truyenco',
  database: process.env.DATABASE_NAME || 'sec',
  synchronize: true,
  logging: process.env.DATABASE_LOGGING === 'true' || false,
}));
