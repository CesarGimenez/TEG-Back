import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PharmacyController } from './pharmacy.controller';
import { PharmacyService } from './pharmacy.service';
import { PharmacySchema } from './schema/pharmacy.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pharmacy', schema: PharmacySchema }]),
  ],
  controllers: [PharmacyController],
  providers: [PharmacyService],
})
export class PharmacyModule {}
