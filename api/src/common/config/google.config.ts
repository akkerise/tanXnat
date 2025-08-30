import { registerAs } from '@nestjs/config';

export default registerAs('google', () => ({
  google_sheet_id: process.env.GOOGLE_SHEET_ID,
  map_key: process.env.GOOGLE_MAP_KEY || '',
  map_api: process.env.GOOGLE_MAP_API || 'https://maps.googleapis.com/maps/api',
}));
