import { registerAs } from '@nestjs/config';

export default registerAs('sms', () => ({
  apiKey: process.env.SMS_KARADEN_API_KEY || '',
  apiId: process.env.SMS_KARADEN_API_ID || '',
}));
