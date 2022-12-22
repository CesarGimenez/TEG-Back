import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Schema({ timestamps: true })
export class MedicalRecord extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', unique: true })
  patient: User;

  @Prop({ required: true })
  general: string;

  @Prop({ required: true })
  current_illness: string;

  @Prop({ required: true })
  personal_history: string;

  @Prop({ default: true })
  family_history: string;

  @Prop({ default: true })
  surgical_history: string;

  @Prop({ default: true })
  immunizations: string;

  @Prop({ default: true })
  gynecologic_history: string;

  @Prop({ default: true })
  treatment: string;

  @Prop({ default: true })
  therapeutic_plan: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  last_update: User;
}

export const MedicalRecordSchema = SchemaFactory.createForClass(MedicalRecord);
