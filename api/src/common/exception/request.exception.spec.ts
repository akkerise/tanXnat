import { HttpException, HttpStatus } from '@nestjs/common';
import { RequestException } from './request.exception';

describe('RequestException', () => {
  it('should create an instance with default values', () => {
    const exception = new RequestException('Test message');

    expect(exception).toBeInstanceOf(RequestException);
    expect(exception).toBeInstanceOf(HttpException);
    expect(exception.getStatus()).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(exception.getResponse()).toEqual({
      message: 'Test message',
      data: undefined,
    });
  });

  it('should create an instance with provided data', () => {
    const exception = new RequestException('Test message', {
      key: 'value',
    });

    expect(exception).toBeInstanceOf(RequestException);
    expect(exception).toBeInstanceOf(HttpException);
    expect(exception.getStatus()).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(exception.getResponse()).toEqual({
      message: 'Test message',
      data: {
        key: 'value',
      },
    });
  });

  // Add more test cases to cover different scenarios and edge cases
});
