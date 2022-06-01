import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: Date })
  birthdate;

  @Prop()
  image: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  is_Admin: boolean;

  @Prop()
  parent_phone: string;

  @Prop()
  secret_word: string;

  @Prop()
  blood_group: string;

  @Prop()
  centeradmin: string;

  @Prop()
  pharmacyadmin: string;

  @Prop()
  areas: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
