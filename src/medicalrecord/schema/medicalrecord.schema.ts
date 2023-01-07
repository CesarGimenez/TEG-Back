import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Schema({ timestamps: true })
export class MedicalRecord extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', unique: true })
  patient: User;

  @Prop({ default: '' })
  general: string;

  @Prop({ default: '' })
  current_illness: string;

  @Prop({ default: '' })
  personal_history: string;

  @Prop({ default: '' })
  family_history: string;

  @Prop({ default: '' })
  surgical_history: string;

  @Prop({ default: '' })
  immunizations: string;

  @Prop({ default: '' })
  gynecologic_history: string;

  @Prop({ default: '' })
  treatment: string;

  @Prop({ default: '' })
  therapeutic_plan: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  last_update: User;
}

export const MedicalRecordSchema = SchemaFactory.createForClass(MedicalRecord);
