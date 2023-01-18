import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Area } from 'src/area/schema/area.schema';

@Schema({ timestamps: true })
export class Disease extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  syntoms: string;

  @Prop({ required: true, default: true })
  active: boolean;

  @Prop({ required: true, default: false })
  require_diagnosys: boolean;

  @Prop({ required: true })
  transmission: string;

  @Prop({ required: true })
  treatment: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Area' }] })
  areas: Area[];
}

export const DiseaseSchema = SchemaFactory.createForClass(Disease);
