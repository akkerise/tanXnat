import { ApiProperty } from '@nestjs/swagger';

export class EmergencyDataRes {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  userPhone: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  locationId: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  location: {
    lat: number;
    long: number;
  };
}
