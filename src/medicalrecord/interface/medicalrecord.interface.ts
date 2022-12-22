import { Document } from 'mongoose';

export class MedicalRecordI extends Document {
  patient: string;
  general: string;
  current_illness: string;
  personal_history: string;
  family_history: string;
  surgical_history: string;
  immunizations: string;
  gynecologic_history: string;
  treatment: string;
  therapeutic_plan: string;
  last_update: string;
}
