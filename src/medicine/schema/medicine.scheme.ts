import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Disease } from 'src/disease/schema/disease.schema';

export enum WayType {
  ORAL = 'Oral',
  INTRAVENOSA = 'Intravenosa',
  INTRAMUSCULAR = 'Intramuscular',
  INTRATECAL = 'Intratecal',
  SUBCUTANEA = 'Subcutánea',
  SUBLINGUAL = 'Sublingual',
  BUCAL = 'Bucal',
  RECTAL = 'Rectal',
  VAGINAL = 'Vaginal',
  OCULAR = 'Ocular',
  OTICA = 'Otica',
  NASAL = 'Nasal',
  NEBULIZACION = 'Nebulizacion',
  INHALACION = 'Inhalacion',
  TRANSDERMICO = 'transdérmico',
  OTRO = 'Otro',
}
@Schema({ timestamps: true })
export class Medicine extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  posology: string;

  @Prop({
    required: true,
    type: 'String',
    enum: WayType,
    default: WayType.ORAL,
  })
  way: WayType;

  @Prop({ required: false })
  principle: string;

  @Prop({ required: true, default: true })
  active: boolean;

  @Prop({ required: true })
  high_price: boolean;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Disease' }] })
  diseases: Disease[];
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);
