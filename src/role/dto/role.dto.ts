import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class roleDTO {
  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  type: number;

  @IsNotEmpty()
  @ApiProperty({ example: 'Usuario' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Algunos permisos' })
  description: string;
}
