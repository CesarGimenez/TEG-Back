import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiagnosticController } from './diagnostic.controller';
import { DiagnosticService } from './diagnostic.service';
import { DiagnosisSchema } from './schema/diagnostic.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Diagnosis', schema: DiagnosisSchema }]),
  ],
  controllers: [DiagnosticController],
  providers: [DiagnosticService],
})
export class DiagnosticModule {}
