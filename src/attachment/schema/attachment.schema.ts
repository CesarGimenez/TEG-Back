import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Schema({ timestamps: true })
export class Attahcment extends Document {
  @Prop({
    required: true,
  })
  description: string;

  @Prop({ required: true })
  url_doc: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  uploaded_by: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  patient: User;
}

export const AttachmentSchema = SchemaFactory.createForClass(Attahcment);
