import { RedisModule } from '@nestjs-modules/ioredis';
import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IsUnique } from '@Validator/unique';
import { redisStore } from 'cache-manager-redis-store';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import configuration from './common/config';
import { IRedisConfig } from './common/config/redis.config';
import { FileModule } from './file/file.module';
import { NotificationModule } from './notification/notification.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { IsNotExitsRoleConstraint } from './user/validator/check-role.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configuration,
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 60,
      },
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (c: ConfigService) => {
        const configDatabase = c.get<TypeOrmModuleOptions>('database');
        return {
          ...configDatabase,
          autoLoadEntities: true,
          entities: [join(__dirname, '**/**.entity{.ts,.js}')],
          timezone: 'UTC',
        } as TypeOrmModuleOptions;
      },
    }),
    CacheModule.registerAsync<any>({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (c: ConfigService) => {
        const cacheConfig = c.get<IRedisConfig>('redis');
        const storeConfig: any = {
          socket: {
            host: cacheConfig.host,
            port: cacheConfig.port,
          },
          database: cacheConfig.db,
          username: cacheConfig.username,
          password: cacheConfig.password,
          ttl: 60 * 60 * 24,
        };
        const store = await redisStore(storeConfig);
        return {
          store,
        };
      },
      isGlobal: true,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (c: ConfigService) => {
        console.log(
          `redis://${c.get<string>('redis.host')}:${c.get<number>(
            'redis.port',
          )}`,
        );

        return {
          config: {
            url: `redis://${c.get<string>('redis.host')}:${c.get<number>(
              'redis.port',
            )}`,
          },
        };
      },
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (c: ConfigService) => {
        return {
          name: 'jobs',
          redis: {
            host: c.get<string>('redis.host'),
            port: c.get<number>('redis.port'),
          },
        };
      },
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    AuthModule,
    RoleModule,
    UserModule,
    FileModule,
    NotificationModule,
  ],
  providers: [
    IsUnique,
    IsNotExitsRoleConstraint,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
