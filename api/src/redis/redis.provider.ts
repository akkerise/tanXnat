import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export type RedisClient = Redis;

export const redisProvider: Provider = {
  useFactory: (c: ConfigService): RedisClient => {
    return new Redis({
      host: c.get<string>('redis.host'),
      port: c.get<number>('redis.port'),
    });
  },

  provide: 'REDIS_CLIENT',
};
