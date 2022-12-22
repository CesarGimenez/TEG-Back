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

  treatment: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Area' }] })
  areas: Area[];
}

export const DiseaseSchema = SchemaFactory.createForClass(Disease);
