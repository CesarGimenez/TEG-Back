import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMedicalrecordDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'ID del paciente' })
  patient: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Antecedentes generales', default: '' })
  general: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Enfermedad actual', default: '' })
  current_illness: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Antecedentes personales', default: '' })
  personal_history: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Antecedentes familiares', default: '' })
  family_history: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Antecedentes quirurgicos', default: '' })
  surgical_history: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Historial de inmunizaciones', default: '' })
  immunizations: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Antecedentes ginecologicos', default: '' })
  gynecologic_history: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Tratamiento actual', default: '' })
  treatment: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Plan terapeutico', default: '' })
  therapeutic_plan: string;

  @IsOptional()
  last_update: string;
}
