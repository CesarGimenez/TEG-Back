import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class userDTO {
  @IsNotEmpty()
  @ApiProperty()
  first_name: string;

  @IsNotEmpty()
  @ApiProperty()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @ApiProperty()
  birthdate: Date;

  @IsNotEmpty()
  @ApiProperty()
  secret_word: string;

  blood_group: string;
  parent_phone: string;
  active: boolean;
  is_admin: boolean;
  areas: string[];
  centeradmin: string;
  pharmacyadmin: string;
}
