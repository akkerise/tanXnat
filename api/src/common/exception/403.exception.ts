import {
  HttpException,
  HttpExceptionBodyMessage,
  HttpStatus,
} from '@nestjs/common';

export class CForbiddenRequestException extends HttpException {
  constructor(message: HttpExceptionBodyMessage) {
    super(
      HttpException.createBody('', message, HttpStatus.FORBIDDEN),
      HttpStatus.FORBIDDEN,
    );
  }
}
