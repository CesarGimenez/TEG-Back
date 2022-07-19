import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiseaseController } from './disease.controller';
import { DiseaseService } from './disease.service';
import { DiseaseSchema } from './schema/disease.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Disease', schema: DiseaseSchema }]),
  ],
  controllers: [DiseaseController],
  providers: [DiseaseService],
})
export class DiseaseModule {}
