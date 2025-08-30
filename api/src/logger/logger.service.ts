import { CBadRequestException } from '@/common/exception/400.exception';
import { Injectable } from '@nestjs/common';
@Injectable()
export class LoggerService {
  constructor() {}
  getLog(error: any) {
    console.log('-------------------------------------------------');
    console.log(error);
    console.log('-------------------------------------------------');

    if (error instanceof CBadRequestException) return error;
    return {
      message: null,
    };
  }
}
