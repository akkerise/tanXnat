import {
  HttpException,
  HttpExceptionBodyMessage,
  HttpStatus,
} from '@nestjs/common';

export class CNotFoundRequestException extends HttpException {
  constructor(message: HttpExceptionBodyMessage) {
    super(
      HttpException.createBody('', message, HttpStatus.NOT_FOUND),
      HttpStatus.NOT_FOUND,
    );
  }
}

export class BadRequestHttpException extends HttpException {
  constructor(message: HttpExceptionBodyMessage) {
    super(
      HttpException.createBody('', message, HttpStatus.BAD_REQUEST),
      HttpStatus.BAD_REQUEST,
    );
  }
}
