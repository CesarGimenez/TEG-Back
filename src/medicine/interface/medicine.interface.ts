import { Document } from 'mongoose';

export interface MedicineI {
  name: string;
  description: string;
  posology: string;
  high_price: boolean;
  diseases: Array<string>;
}
