import { Module } from '@nestjs/common';
import { MedicalrecordService } from './medicalrecord.service';
import { MedicalrecordController } from './medicalrecord.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalRecordSchema } from './schema/medicalrecord.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Medicalrecord', schema: MedicalRecordSchema },
    ]),
  ],
  controllers: [MedicalrecordController],
  providers: [MedicalrecordService],
})
export class MedicalrecordModule {}
