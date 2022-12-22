import { Document } from 'mongoose';
import { WayType } from '../schema/medicine.scheme';

export interface MedicineI {
  name: string;
  description: string;
  principle: string;
  way: WayType;
  posology: string;
  high_price: boolean;
  diseases: Array<string>;
}
