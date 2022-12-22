import { PartialType } from '@nestjs/swagger';
import { CreateMedicalrecordDto } from './create-medicalrecord.dto';

export class UpdateMedicalrecordDto extends PartialType(
  CreateMedicalrecordDto,
) {}
