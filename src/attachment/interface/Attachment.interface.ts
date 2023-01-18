import { Document } from 'mongoose';

export interface AttachmentI extends Document {
  type: string;
  description: string;
  url_doc: string;
  uploaded_by: string;
  patient: string;
}
