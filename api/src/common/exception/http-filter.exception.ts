import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const resEx = exception.getResponse();
    let message = '';
    let data = null;
    if (typeof resEx === 'object') {
      const rEx: any = resEx;
      message = rEx.error;
      if (rEx.msg) {
        message = rEx.msg;
      }
      if (rEx.data) {
        data = rEx.data;
      }
      if (rEx.message) {
        if (typeof rEx.message === 'string') {
          message = rEx.message;
        }

        if (
          typeof rEx.message === 'object' &&
          !rEx.message.msg &&
          rEx.message.msg !== ''
        ) {
          data = rEx.message;
        }
      }
    }

    response.status(status).json({
      message,
      data,
    });
  }
}
