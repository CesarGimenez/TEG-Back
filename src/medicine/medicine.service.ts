import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MedicineI } from './interface/medicine.interface';

@Injectable()
export class MedicineService {
  constructor(
    @InjectModel('Medicine')
    private MedicineModel: Model<MedicineI>,
  ) {}

  async getAll(): Promise<MedicineI[]> {
    const medicines = await this.MedicineModel.find().populate('diseases');
    return medicines;
  }

  async getOne(id: string): Promise<MedicineI> {
    const medicine = await this.MedicineModel.findById(id).populate('diseases');
    return medicine;
  }

  async createMedicine(body: any): Promise<any> {
    const { name, description, posology, high_price, diseases } = body;
    const newMedicine = new this.MedicineModel({
      name,
      description,
      posology,
      high_price,
      diseases,
    });
    await newMedicine.save();
    return newMedicine;
  }

  async updateMedicine(id: string, body: any): Promise<any> {
    const updateMedicine = await this.MedicineModel.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
      },
    );
    return updateMedicine;
  }

  async deleteMedicine(id: string): Promise<any> {
    const MedicineDeleted = await this.MedicineModel.findByIdAndDelete(id);
    return { MedicineDeleted };
  }
}
