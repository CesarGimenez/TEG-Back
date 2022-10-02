import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class authDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'ejemplo@gmail.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Hola.123*' })
  password: string;
}
