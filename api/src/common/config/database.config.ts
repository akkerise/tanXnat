import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DATABASE_TYPE || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'truyenco',
  database: process.env.DATABASE_NAME || 'sec',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.DATABASE_LOGGING === 'true' || false,
}));
