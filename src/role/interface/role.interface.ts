import { Document } from 'mongoose';

export interface RoleI extends Document {
  type: number;
  name: string;
  description: string;
}
