import {
  HttpException,
  HttpExceptionBodyMessage,
  HttpStatus,
} from '@nestjs/common';

export class RequestException extends HttpException {
  constructor(message: HttpExceptionBodyMessage) {
    super(
      HttpException.createBody('', message, HttpStatus.INTERNAL_SERVER_ERROR),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
