import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
export class userDTO {
  @IsNotEmpty()
  @ApiProperty({ example: 'Juan' })
  first_name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Perez' })
  last_name: string;

  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  dni: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'juan@gmail.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  @MinLength(5)
  @MaxLength(12)
  password: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Calle los cerezos' })
  address: string;

  @IsNotEmpty()
  @ApiProperty({ example: '+58 12345678' })
  phone: string;

  @IsNotEmpty()
  birthdate: Date;

  @ApiProperty({ example: 'Palabrasecreta' })
  @IsOptional()
  secret_word: string;

  @ApiProperty({ example: 'A+' })
  @IsOptional()
  blood_group: string;

  @ApiProperty({ example: '+58 11111111' })
  @IsOptional()
  parent_phone: string;

  active: boolean;
  is_admin: boolean;

  @ApiProperty({
    example: ['Si es medico, aca van los id de sus especialidades (areas)'],
  })
  areas: string[];

  @ApiProperty({
    example: 'Si es un Admin de centro de salud, aca va el id del centro',
  })
  centeradmin: string;

  @ApiProperty({
    example: 'Si es un Admin de farmacia, aca va el id de la farmacia',
  })
  pharmacyadmin: string;

  @ApiProperty({ example: 'Aca va el id del Rol' })
  @IsNotEmpty()
  role_id: string;
}
