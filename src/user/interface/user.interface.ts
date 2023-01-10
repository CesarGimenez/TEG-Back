import { Document } from 'mongoose';

export interface UserI extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  birthdate: string;
  image: string;
  active: boolean;
  is_admin: boolean;
  parent_phone: string;
  secret_word: string;
  blood_group: string;
  centeradmin: string;
  pharmacyadmin: string;
  areas: string[];
  role_id: string;
  mpps_id: string;
  college_medic_id: string;
  doctor_signature: string;
  is_doctor: boolean;
}
