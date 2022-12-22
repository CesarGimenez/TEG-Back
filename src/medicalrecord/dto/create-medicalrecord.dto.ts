import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMedicalrecordDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'ID del paciente' })
  patient: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Antecedentes generales' })
  general: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Enfermedad actual' })
  current_illness: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Antecedentes personales' })
  personal_history: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Antecedentes familiares' })
  family_history: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Antecedentes quirurgicos' })
  surgical_history: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Historial de inmunizaciones' })
  immunizations: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Antecedentes ginecologicos' })
  gynecologic_history: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Tratamiento actual' })
  treatment: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Plan terapeutico' })
  therapeutic_plan: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Ultima actualizacion por.. (Doctor ID)' })
  last_update: string;
}
