import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from './role/role.module';
import { AreaModule } from './area/area.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
