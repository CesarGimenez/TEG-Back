import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { DiagnosisType } from '../schema/diagnostic.schema';
export class DiagnosisDTO {
  @IsNotEmpty()
  @ApiProperty({ example: 'Clínico', enum: DiagnosisType, enumName: 'type' })
  type: DiagnosisType;

  @IsNotEmpty()
  @ApiProperty({ example: 'Algun motivo de consulta' })
  reason: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Examen fisico' })
  physical_exam: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Algunos permisos' })
  description: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Algunos sintomas de ejemplo' })
  symptoms: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Recomendacion farmaceutica' })
  pharmaceutic_recomendation: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'recomendacion medica' })
  medic_recomendation: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Tratamiento' })
  treatment: string;

  // @IsNotEmpty()
  // @ApiProperty({ example: [] })
  // diseases: string[];

  @IsNotEmpty()
  @ApiProperty({ example: '' })
  area: string;

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
