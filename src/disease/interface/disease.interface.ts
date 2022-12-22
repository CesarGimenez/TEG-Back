import { Document } from 'mongoose';

export interface DiseaseI extends Document {
  name: string;
  description: string;
  syntoms: string;
  treatment: string;
  active: boolean;
  areas: string[];
  require_diagnosys: boolean;
  transmission: string;
}
