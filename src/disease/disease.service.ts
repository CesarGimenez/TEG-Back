import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiseaseDTO } from './dto/disease.dto';
import { DiseaseI } from './interface/disease.interface';

@Injectable()
export class DiseaseService {
  constructor(@InjectModel('Disease') private diseaseModel: Model<DiseaseI>) {}

  async getAllDiseases(): Promise<DiseaseI[]> {
    const disease = await this.diseaseModel.find().populate('areas');
    return disease;
  }

  async getOneDisease(id: string): Promise<DiseaseI> {
    const disease = await this.diseaseModel.findById(id).populate('areas');
    return disease;
  }

  async createDisease(disease: DiseaseDTO): Promise<any> {
    const { name, description, treatment, areas, syntoms, transmission } =
      disease;
    const newDisease = new this.diseaseModel({
      name,
      description,
      treatment,
      areas,
      syntoms,
      transmission,
    });
    await newDisease.save();
    return newDisease;
  }

  async updateDisease(id: string, disease: any): Promise<any> {
    const updateDisease = await this.diseaseModel.findByIdAndUpdate(
      id,
      disease,
      {
        new: true,
      },
    );
    return updateDisease;
  }

  async deleteDisease(id: string): Promise<any> {
    const diseaseDeleted = await this.diseaseModel.findByIdAndDelete(id);
    return { diseaseDeleted };
  }
}
