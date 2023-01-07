import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { Area } from 'src/area/schema/area.schema';
import { HealthCenter } from 'src/healthcenter/schema/healthcenter.schema';
import { Pharmacy } from 'src/pharmacy/schema/pharmacy.schema';
import { Role } from '../../role/schema/role.schema';
@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, unique: true })
  dni: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: Date })
  birthdate: any;

  @Prop()
  image: string;

  @Prop()
  gender?: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  is_Admin: boolean;

  @Prop({ default: '' })
  parent_phone: string;

  @Prop({ default: '' })
  secret_word: string;

  @Prop({ default: '' })
  blood_group: string;

  @Prop({ default: '' })
  address: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Healthcenter' })
  centeradmin?: HealthCenter;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy' })
  pharmacyadmin?: Pharmacy;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Area' }] })
  areas: Area[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Role' })
  role_id: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
