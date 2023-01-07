import { IsOptional } from 'class-validator';

export class queryUserDto {
  @IsOptional()
  first_name?: string;

  @IsOptional()
  last_name?: string;

  @IsOptional()
  dni?: string;
}
