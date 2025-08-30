import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';

@Exclude()
export class CreateLivingDto {
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
  address_code?: string;

  @ApiProperty()
  @Expose()
  type?: string;
}

@Exclude()
export class RegisterByPhoneDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    minLength: 13,
    maxLength: 13,
  })
  @Expose()
  @Length(13)
  phone?: string;

  @ApiProperty()
  @Expose()
  password?: string;

  // for accommodation update
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  address?: string;

  @ApiProperty()
  @Expose()
  registerCode?: string;
}

@Exclude()
export class CreateUserDto extends RegisterByPhoneDto {
  @ApiProperty({
    nullable: true,
    required: false,
  })
  @Expose()
  username?: string;

  @ApiProperty({ required: false })
  @Expose()
  active?: boolean;

  @ApiProperty({ required: false })
  @Expose()
  roleId?: number;

  @ApiProperty({ required: false })
  @Expose()
  livingId?: string;

  @ApiProperty({ required: false })
  family?: string;
}
