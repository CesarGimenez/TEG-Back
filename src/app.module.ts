import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from './role/role.module';
import { AreaModule } from './area/area.module';
import { DiseaseModule } from './disease/disease.module';
import { MedicineModule } from './medicine/medicine.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { HealthcenterModule } from './healthcenter/healthcenter.module';
import { DiagnosticModule } from './diagnostic/diagnostic.module';
import { AttachmentModule } from './attachment/attachment.module';
@Module({
  imports: [
    UserModule,
    AuthModule,
    CloudinaryModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:teg2022@teg.zchc0.mongodb.net/?retryWrites=true&w=majority',
    ),
    RoleModule,
    AreaModule,
    DiseaseModule,
    MedicineModule,
    PharmacyModule,
    HealthcenterModule,
    DiagnosticModule,
    AttachmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
