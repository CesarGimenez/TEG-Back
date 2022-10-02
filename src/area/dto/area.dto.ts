import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class areaDTO {
  @IsNotEmpty()
  @ApiProperty({ example: 'Nombre del area' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Descripcion del area' })
  description: string;
}
