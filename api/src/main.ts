import './env';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import {
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { errFormat, filterError } from '@Util/filter-error';
import { HttpFilter } from '@Exception/http-filter.exception';
import { RedisIoAdapter } from '@Common/socket/redis.adapter';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.setGlobalPrefix('api');
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors({
    origin: function (_origin, callback) {
      callback(null, true);
    },
  });
  const configService = app.get(ConfigService);

  const redisIoAdapter = new RedisIoAdapter(app);
  const hostRedis = configService.get<string>('redis.host');
  const portRedis = configService.get<string>('redis.port');
  redisIoAdapter.setRedis(hostRedis, portRedis);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  const port = configService.get<string>('app.port');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(
          errFormat('ValidationError', filterError(errors)),
        );
      },
    }),
  );
  app.useGlobalFilters(new HttpFilter());

  if (configService.get<boolean>('app.isSwagger')) {
    const options = new DocumentBuilder()
      .setTitle('API backend user')
      .setDescription('API Server')
      .setVersion('dev')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(port, () => {
    console.log(
      '🚀 Start at port: ',
      port,
      '. Node version: ',
      process.version,
    );
  });
}
bootstrap();
