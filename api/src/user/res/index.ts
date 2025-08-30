import { ApiProperty } from '@nestjs/swagger';

export class UserDaysRes {
  @ApiProperty()
  otDays: number;

  @ApiProperty()
  workDays: number;

  @ApiProperty()
  normalDays: number;

  @ApiProperty()
  actualDays: number;

  @ApiProperty()
  totalOtHours: number;

  @ApiProperty()
  totalWorkHours: number;
}

export class UserOffDaysRes {
  @ApiProperty()
  offOTDays?: number;

  @ApiProperty()
  soon?: number;

  @ApiProperty()
  notOnTimes?: number;

  @ApiProperty()
  remainingDays?: number;

  @ApiProperty()
  offDaysInMonthUnpaid?: number;

  @ApiProperty()
  offDaysInMonthPaid?: number;

  @ApiProperty()
  listError?: any;

  @ApiProperty()
  reserveOffDays?: number;

  @ApiProperty()
  reserveOffOtDays?: number;

  @ApiProperty()
  countLeaveRequest?: any;

  @ApiProperty()
  totalOffDays?: number;
}

export class UserReportRes {
  @ApiProperty({ required: false })
  period?: Date;

  @ApiProperty({ required: false })
  department?: string;
}
