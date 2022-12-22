import { Document } from 'mongoose';

export interface PharmacyI {
  name: string;
  location: LocationI;
  address: string;
  state: string;
  phones: string;
  is_active: boolean;
  medicines: Array<string>;
}

export interface LocationI {
  lat: number;
  lng: number;
}
