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
        .populate('doctor patient');
      return diagnosis;
    } catch (error) {
      throw Error(error);
    }
  }

  async getDiagnosisByPatient(
    id: string,
    limit?: number,
  ): Promise<DiagnosisI[]> {
    try {
      let diagnosis = await this.diagnosisModel
        .find({ patient: id })
        .sort({ createdAt: -1 })
        .populate('doctor patient healthcenter area');
      if (limit) {
        diagnosis = await this.diagnosisModel
          .find({ patient: id })
          .sort({ createdAt: -1 })
          .limit(limit)
          .populate('doctor patient healthcenter area');
      }
      return diagnosis;
    } catch (error) {
      throw Error(error);
    }
  }

  async getDiagnosisByDoctor(id: string): Promise<DiagnosisI[]> {
    try {
      const diagnosis: DiagnosisI[] = await this.diagnosisModel
        .find({ doctor: id })
        .sort({ createdAt: -1 })
        .populate('doctor patient healthcenter area');
      return diagnosis;
    } catch (error) {
      throw Error(error);
    }
  }

  async createDiagnosis(diagnosis: DiagnosisDTO): Promise<DiagnosisI> {
    try {
      const newDiagnosis = new this.diagnosisModel(diagnosis);
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
