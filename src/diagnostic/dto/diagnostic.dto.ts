import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { DiagnosisType } from '../schema/diagnostic.schema';
export class DiagnosisDTO {
  @IsNotEmpty()
  @ApiProperty({ example: 'Clínico', enum: DiagnosisType, enumName: 'type' })
  type: DiagnosisType;

  @IsNotEmpty()
  @ApiProperty({ example: 'Algunos permisos' })
  description: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Algunos sintomas de ejemplo' })
  symptoms: string;

  @IsNotEmpty()
  @ApiProperty({ example: [] })
  diseases: string[];

  @IsNotEmpty()
  @ApiProperty({ example: '' })
  doctor: string;

  @IsNotEmpty()
  @ApiProperty({ example: '' })
  patient: string;

  @IsNotEmpty()
  @ApiProperty({ example: '' })
  healthcenter: string;
}
