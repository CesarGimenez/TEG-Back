import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { Area } from 'src/area/schema/area.schema';
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

  @Prop({ default: '' })
  centeradmin: string;

  @Prop({ default: '' })
  pharmacyadmin: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Area' }] })
  areas: Area[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Role' })
  role_id: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
