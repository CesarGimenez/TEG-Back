import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthcenterController } from './healthcenter.controller';
import { HealthcenterService } from './healthcenter.service';
import { HealthCenterSchema } from './schema/healthcenter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Healthcenter', schema: HealthCenterSchema },
    ]),
  ],
  controllers: [HealthcenterController],
  providers: [HealthcenterService],
})
export class HealthcenterModule {}
