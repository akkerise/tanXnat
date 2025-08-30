import {
  HttpException,
  HttpExceptionBodyMessage,
  HttpStatus,
} from '@nestjs/common';

export class CBadRequestException extends HttpException {
  constructor(message: HttpExceptionBodyMessage) {
    super(
      HttpException.createBody('', message, HttpStatus.BAD_REQUEST),
      HttpStatus.BAD_REQUEST,
    );
  }
}
