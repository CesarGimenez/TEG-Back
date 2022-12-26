import { Document } from 'mongoose';

export interface AreaI extends Document {
  name: string;
  description: string;
  active: boolean;
}
