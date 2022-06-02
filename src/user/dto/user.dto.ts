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

  @ApiProperty()
  blood_group: string;

  @ApiProperty()
  parent_phone: string;

  active: boolean;
  is_admin: boolean;

  @ApiProperty()
  areas: string[];

  @ApiProperty()
  centeradmin: string;

  @ApiProperty()
  pharmacyadmin: string;

  @ApiProperty()
  @IsNotEmpty()
  role_id: string;
}
