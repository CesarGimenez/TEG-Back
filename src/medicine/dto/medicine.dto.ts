import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { WayType } from '../schema/medicine.scheme';

export class MedicineDTO {
  @IsNotEmpty()
  @ApiProperty({ example: 'Nombre de alguna Medicina' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Medicina buena para ciertas enfermedades como ...' })
  description: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Oral', enum: WayType, enumName: 'way' })
  way: WayType;

  @IsNotEmpty()
  @ApiProperty({ example: 'Acetaminofen' })
  principle: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Tomar cada ?? horas' })
  posology: string;

  @ApiProperty()
  high_price: boolean;

  @ApiProperty({
    example: [],
    required: false,
  })
  diseases: string[];
}
