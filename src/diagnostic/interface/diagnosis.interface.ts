import { Document } from 'mongoose';
import { DiagnosisType } from '../schema/diagnostic.schema';

export interface DiagnosisI extends Document {
  type: DiagnosisType;
  description: string;
  symtoms: string;
  diseases: string[];
  doctor: string;
  patient: string;
  healthcenter: string;
}
