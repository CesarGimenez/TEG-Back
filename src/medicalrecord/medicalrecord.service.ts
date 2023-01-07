import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMedicalrecordDto } from './dto/create-medicalrecord.dto';
import { UpdateMedicalrecordDto } from './dto/update-medicalrecord.dto';
import { MedicalRecordI } from './interface/medicalrecord.interface';

@Injectable()
export class MedicalrecordService {
  constructor(
    @InjectModel('Medicalrecord')
    private medicalRecordModel: Model<MedicalRecordI>,
  ) {}

  async createMedicalRecord(
    createMedicalrecordDto: CreateMedicalrecordDto,
  ): Promise<MedicalRecordI> {
    try {
      const {
        current_illness,
        family_history,
        general,
        gynecologic_history,
        immunizations,
        last_update,
        patient,
        personal_history,
        surgical_history,
        therapeutic_plan,
        treatment,
      } = createMedicalrecordDto;

      const newMedicalRecord = new this.medicalRecordModel({
        current_illness,
        family_history,
        general,
        gynecologic_history,
        immunizations,
        last_update,
        patient,
        personal_history,
        surgical_history,
        therapeutic_plan,
        treatment,
      });

      await newMedicalRecord.save();
      return newMedicalRecord;
    } catch (error) {
      throw Error(error);
    }
  }

  async findAllMedicalRecords(
    documentsToSkip = 0,
    limitOfDocuments?: number,
  ): Promise<any> {
    try {
      const count = await this.medicalRecordModel.find().count();
      let medicalrecords = await this.medicalRecordModel
        .find()
        .populate('patient last_update');
      if (limitOfDocuments) {
        medicalrecords = await this.medicalRecordModel
          .find()
          .populate('patient last_update')
          .sort({ createdAt: -1 })
          .skip(documentsToSkip)
          .limit(limitOfDocuments);
      }
      return { count, medicalrecords };
    } catch (error) {
      throw Error(error);
    }
  }

  async findOneMedicalRecord(id: string): Promise<MedicalRecordI> {
    try {
      const founded = await this.medicalRecordModel
        .findById(id)
        .populate('patient last_updated');
      return founded;
    } catch (error) {
      throw Error(error);
    }
  }

  async findOneMedicalRecordByPatient(id: string): Promise<MedicalRecordI> {
    try {
      const founded = await this.medicalRecordModel
        .findOne({ patient: id })
        .populate('patient');
      return founded;
    } catch (error) {
      throw Error(error);
    }
  }

  async updateMedicalRecord(
    id: string,
    updateMedicalrecordDto: UpdateMedicalrecordDto,
  ): Promise<MedicalRecordI> {
    try {
      const edited = await this.medicalRecordModel.findByIdAndUpdate(
        id,
        updateMedicalrecordDto,
        { new: true },
      );
      return edited;
    } catch (error) {
      throw Error(error);
    }
  }

  async removeMedicalRecord(id: string): Promise<MedicalRecordI> {
    try {
      const deleted = await this.medicalRecordModel.findByIdAndDelete(id);
      return deleted;
    } catch (error) {
      throw Error(error);
    }
  }
}
