import { HttpException, HttpStatus } from '@nestjs/common';
import { CBadRequestException } from './400.exception';

describe('CBadRequestException', () => {
  it('should create an instance with default values', () => {
    const exception = new CBadRequestException('Test message');

    expect(exception).toBeInstanceOf(CBadRequestException);
    expect(exception).toBeInstanceOf(HttpException);
    expect(exception.getStatus()).toEqual(HttpStatus.BAD_REQUEST);
    expect(exception.getResponse()).toEqual({
      message: 'Test message',
      data: undefined,
    });
  });

  it('should create an instance with provided data', () => {
    const exception = new CBadRequestException('Test message', []);

    expect(exception).toBeInstanceOf(CBadRequestException);
    expect(exception).toBeInstanceOf(HttpException);
    expect(exception.getStatus()).toEqual(HttpStatus.BAD_REQUEST);
    expect(exception.getResponse()).toEqual({
      message: 'Test message',
      data: [],
    });
  });

  // Add more test cases to cover different scenarios and edge cases
});
