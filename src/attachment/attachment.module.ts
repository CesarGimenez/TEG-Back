import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttachmentController } from './attachment.controller';
import { AttachmentService } from './attachment.service';
import { AttachmentSchema } from './schema/attachment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Attachment', schema: AttachmentSchema },
    ]),
  ],
  controllers: [AttachmentController],
  providers: [AttachmentService],
})
export class AttachmentModule {}
