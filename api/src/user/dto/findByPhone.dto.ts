import { Exclude, Expose } from 'class-transformer';
import { Length } from 'class-validator';

@Exclude()
export class FindByPhoneDto {
  @Expose()
  @Length(13)
  phone: string;
}
