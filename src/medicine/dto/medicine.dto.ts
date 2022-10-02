import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class MedicineDTO {
  @IsNotEmpty()
  @ApiProperty({ example: 'Nombre de alguna Medicina' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Medicina buena para ciertas enfermedades como ...' })
  description: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Tomar cada ?? horas' })
  posology: string;

  @ApiProperty()
  high_price: boolean;

  @ApiProperty({
    example: ['Aca van los id de enfermedades que pueden ser tratadas'],
  })
  diseases: string[];
}
