import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiagnosisDTO } from './dto/diagnostic.dto';
import { DiagnosisI } from './interface/diagnosis.interface';

@Injectable()
export class DiagnosticService {
  constructor(
    @InjectModel('Diagnosis') private diagnosisModel: Model<DiagnosisI>,
  ) {}

  async getAllDiagnosis(): Promise<DiagnosisI[]> {
    try {
      const diagnosis: DiagnosisI[] = await this.diagnosisModel
        .find()
        .populate('diseases doctor patient');
      return diagnosis;
    } catch (error) {
      throw Error(error);
    }
  }

  async createDiagnosis(diagnosis: DiagnosisDTO): Promise<DiagnosisI> {
    try {
      const { type, symptoms, description, diseases, doctor, patient } =
        diagnosis;
      const newDiagnosis = new this.diagnosisModel({
        type,
        symptoms,
        description,
        diseases,
        doctor,
        patient,
      });
      await newDiagnosis.save();
      return newDiagnosis;
    } catch (error) {
      throw Error(error);
    }
  }

  async updateDiagnosis(id: string, body: DiagnosisDTO): Promise<DiagnosisI> {
    try {
      const diagnosis: DiagnosisI = await this.diagnosisModel.findByIdAndUpdate(
        id,
        body,
        {
          new: true,
        },
      );
      return diagnosis;
    } catch (error) {
      throw Error(error);
    }
  }

  async deleteDiagnosis(id: string): Promise<any> {
    try {
      const diagnosisDeleted = await this.diagnosisModel.findByIdAndDelete(id);
      return { diagnosisDeleted };
    } catch (error) {
      throw Error(error);
    }
  }
}
