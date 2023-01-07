import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { DiseaseSchema } from 'src/disease/schema/disease.schema';
import { MedicalrecordService } from 'src/medicalrecord/medicalrecord.service';
import { MedicalRecordSchema } from 'src/medicalrecord/schema/medicalrecord.schema';
import { UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Disease', schema: DiseaseSchema }]),
    MongooseModule.forFeature([
      { name: 'Medicalrecord', schema: MedicalRecordSchema },
    ]),
    CloudinaryModule,
  ],
  controllers: [UserController],
  providers: [UserService, MedicalrecordService],
  exports: [UserService],
})
export class UserModule {}
