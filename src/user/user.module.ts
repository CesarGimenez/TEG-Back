import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiseaseSchema } from 'src/disease/schema/disease.schema';
import { UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Disease', schema: DiseaseSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
