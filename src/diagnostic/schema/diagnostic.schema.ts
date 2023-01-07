import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Disease } from 'src/disease/schema/disease.schema';
import { User } from 'src/user/schema/user.schema';
import { HealthCenter } from 'src/healthcenter/schema/healthcenter.schema';

export enum DiagnosisType {
  CLINICO = 'Clínico',
  CERTEZA = 'Certeza',
  DIFERENCIAL = 'Diferencial',
  ETIOLOGICO = 'Etiológico',
  GENERICO = 'Genérico',
  ANATOMICO = 'Anatómico',
  PRELIMINAR = 'Preliminar',
  SINTOMATICO = 'Sintomático',
  OTRO = 'Otro',
}
@Schema({ timestamps: true })
export class Diagnosis extends Document {
  @Prop({
    required: true,
    type: 'String',
    enum: DiagnosisType,
    default: DiagnosisType.CLINICO,
  })
  type: DiagnosisType;

  @Prop({ required: true })
  symptoms: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  pharmaceutic_recomendation: string;

  @Prop({ required: true })
  medic_recomendation: string;

  @Prop({ required: true })
  treatment: string;

  // @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Disease' }] })
  // diseases: Disease[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  doctor: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  patient: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Healthcenter' })
  healthcenter: HealthCenter;
}

export const DiagnosisSchema = SchemaFactory.createForClass(Diagnosis);
