import { UserGender, UserRoles } from '@/common/constant/user.constant';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { MaxLength, MinLength } from 'class-validator';

@Exclude()
export class UpdateMeDto {
  @ApiProperty()
  @Expose()
  name?: string;

  @ApiProperty()
  @Expose()
  address?: string;

  @ApiProperty()
  @Expose()
  userId?: string;

  @ApiProperty()
  @Expose()
  birthday?: string;

  @ApiProperty()
  @Expose()
  gender?: string;

  @ApiProperty()
  @Expose()
  roleInFamily?: string;

  @ApiProperty()
  @Expose()
  @MinLength(9)
  @MaxLength(11)
  phone?: string;

  @ApiProperty()
  @Expose()
  accommodationId?: string;

  @ApiProperty()
  @Expose()
  roleId?: number;

  @ApiProperty()
  @Expose()
  note?: string;
}

@Exclude()
export class UpdateMePasswordDto {
  @ApiProperty()
  @Expose()
  oldPassword?: string;

  @ApiProperty({
    required: true,
  })
  @Expose()
  @MinLength(8)
  newPassword?: string;
}

export class BanUserDto {
  @ApiProperty({
    required: true,
  })
  @Expose()
  isActive: boolean;

  @ApiProperty()
  @Expose()
  banAt: string;

  @ApiProperty()
  @Expose()
  note: string;
}

export class UpdateLivingDto {
  @ApiProperty()
  @Expose()
  id?: string;

  @ApiProperty()
  @Expose()
  zid?: string;

  @ApiProperty()
  @Expose()
  lat?: number;

  @ApiProperty()
  @Expose()
  long?: number;

  @ApiProperty()
  @Expose()
  name?: string;

  @ApiProperty()
  @Expose()
  building_name?: string;

  @ApiProperty()
  @Expose()
  address?: string;

  @ApiProperty()
  @Expose()
  post_code?: string;

  @ApiProperty()
  @Expose()
  type?: string;
}

@Exclude()
export class MobileUpdateUser {
  @ApiProperty()
  @Expose()
  name?: string;

  @ApiProperty()
  @Expose()
  gender?: UserGender;

  @ApiProperty()
  @Expose()
  birthday?: string;

  @ApiProperty()
  @Expose()
  note?: string;

  @ApiProperty()
  @Expose()
  family?: string;

  // for accommodation update
  @ApiProperty()
  @Expose()
  accommodationId?: string;

  @ApiProperty()
  @Expose()
  address?: string;
}

@Exclude()
export class UpdateUserDto extends MobileUpdateUser {
  @ApiProperty()
  @Expose()
  roleId?: UserRoles;

  @ApiProperty()
  @Expose()
  active?: boolean;

  @ApiProperty()
  @Expose()
  phone?: string;

  @ApiProperty()
  @Expose()
  livingId?: string;
}
