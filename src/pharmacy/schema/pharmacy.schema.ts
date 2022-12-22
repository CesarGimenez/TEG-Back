import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Medicine } from 'src/medicine/schema/medicine.scheme';

@Schema({ timestamps: true })
export class Pharmacy extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Object })
  location: object;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  phones: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Medicine' }] })
  medicines: Medicine[];
}

export const PharmacySchema = SchemaFactory.createForClass(Pharmacy);
