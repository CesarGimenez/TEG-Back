import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Disease } from 'src/disease/schema/disease.schema';

@Schema()
export class Medicine extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  posology: string;

  @Prop({ required: true })
  high_price: boolean;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Disease' }] })
  diseases: Disease[];
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);
