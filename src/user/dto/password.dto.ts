import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class passwordDTO {
  @IsNotEmpty()
  @ApiProperty({ example: 'Hola.123*' })
  @MinLength(5)
  @MaxLength(12)
  password: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Hola.123*' })
  @MinLength(5)
  @MaxLength(12)
  confirmPassword: string;
}
