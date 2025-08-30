import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    required: true,
  })
  name: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  roleId?: number;

  @ApiProperty({ type: [String] })
  permissions?: string[];
}
