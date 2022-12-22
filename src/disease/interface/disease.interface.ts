import { Document } from 'mongoose';

export interface DiseaseI extends Document {
  name: string;
  description: string;
  syntoms: string;
  treatment: string;
  areas: string[];
}
