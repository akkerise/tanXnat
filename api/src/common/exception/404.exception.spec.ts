import { HttpException, HttpStatus } from '@nestjs/common';
import {
  BadRequestHttpException,
  CNotFoundRequestException,
} from './404.exception';

describe('CNotFoundRequestException', () => {
  it('should create an instance with default values', () => {
    const exception = new CNotFoundRequestException('Test message');

    expect(exception).toBeInstanceOf(CNotFoundRequestException);
    expect(exception).toBeInstanceOf(HttpException);
    expect(exception.getStatus()).toEqual(HttpStatus.NOT_FOUND);
    expect(exception.getResponse()).toEqual({
      message: 'Test message',
      data: undefined,
    });
  });

  it('should create an instance with provided data', () => {
    const exception = new CNotFoundRequestException('Test message', {
      key: 'value',
    });

    expect(exception).toBeInstanceOf(CNotFoundRequestException);
    expect(exception).toBeInstanceOf(HttpException);
    expect(exception.getStatus()).toEqual(HttpStatus.NOT_FOUND);
    expect(exception.getResponse()).toEqual({
      message: 'Test message',
      data: {
        key: 'value',
      },
    });
  });

  // Add more test cases to cover different scenarios and edge cases
});

describe('BadRequestHttpException', () => {
  it('should create an instance with default values', () => {
    const exception = new BadRequestHttpException('Test message');

    expect(exception).toBeInstanceOf(BadRequestHttpException);
    expect(exception).toBeInstanceOf(HttpException);
    expect(exception.getStatus()).toEqual(HttpStatus.BAD_REQUEST);
    expect(exception.getResponse()).toEqual({
      message: 'Test message',
      data: undefined,
    });
  });

  it('should create an instance with provided data', () => {
    const exception = new BadRequestHttpException('Test message', {
      key: 'value',
    });

    expect(exception).toBeInstanceOf(BadRequestHttpException);
    expect(exception).toBeInstanceOf(HttpException);
    expect(exception.getStatus()).toEqual(HttpStatus.BAD_REQUEST);
    expect(exception.getResponse()).toEqual({
      message: 'Test message',
      data: {
        key: 'value',
      },
    });
  });

  // Add more test cases to cover different scenarios and edge cases
});
