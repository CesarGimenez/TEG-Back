import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Schema()
export class HealthCenter extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Object })
  location: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phones: string;

  is_public: boolean;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  doctors: User[];
}

export const HealthCenterSchema = SchemaFactory.createForClass(HealthCenter);
