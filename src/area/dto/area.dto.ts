import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class areaDTO {
  @IsNotEmpty()
  @ApiProperty({ example: 'Nombre del area' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Descripcion del area' })
  description: string;

  @IsOptional()
  @ApiProperty({ example: true })
  active: boolean;
}
