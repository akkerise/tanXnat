import { EMERGENCY_STATUS } from '@/common/constant/notification.constant';
import { ApiProperty } from '@nestjs/swagger';

export class GetNotificationsParams {
  @ApiProperty()
  type?: string;

  @ApiProperty()
  search?: string;

  @ApiProperty()
  status?: string;

  @ApiProperty()
  currentPage?: number;

  @ApiProperty()
  pageSize?: number;
}

export class GetTotalUnreadNotificationDto {
  @ApiProperty()
  type?: string;
}

export class ConfirmEmergencyDto {
  @ApiProperty()
  type: EMERGENCY_STATUS;

  @ApiProperty()
  notificationId: string;

  @ApiProperty()
  locationId: string;

  @ApiProperty()
  companyName: string;
}
