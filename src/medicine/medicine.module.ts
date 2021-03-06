import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicineController } from './medicine.controller';
import { MedicineService } from './medicine.service';
import { MedicineSchema } from './schema/medicine.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Medicine', schema: MedicineSchema }]),
  ],
  controllers: [MedicineController],
  providers: [MedicineService],
})
export class MedicineModule {}
