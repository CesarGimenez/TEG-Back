import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AttachmentI } from './interface/Attachment.interface';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectModel('Attachment') private attachmentModel: Model<AttachmentI>,
  ) {}

  async getAllDocs(): Promise<AttachmentI[]> {
    try {
      const doc: AttachmentI[] = await this.attachmentModel
        .find()
        .populate('uploaded_by');
      return doc;
    } catch (error) {
      throw Error(error);
    }
  }

  async getAllDocsByPatient(id: string): Promise<AttachmentI[]> {
    try {
      const docs: AttachmentI[] = await this.attachmentModel
        .find({ patient: id })
        .sort({ createdAt: -1 })
        .populate('uploaded_by patient');
      return docs;
    } catch (error) {
      throw Error(error);
    }
  }

  async createDoc(doc: any): Promise<any> {
    try {
      const newDoc = new this.attachmentModel(doc);
      await newDoc.save();
      return newDoc;
    } catch (error) {
      throw Error(error);
    }
  }
}
