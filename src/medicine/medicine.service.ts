import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MedicineDTO } from './dto/medicine.dto';
import { MedicineI } from './interface/medicine.interface';

@Injectable()
export class MedicineService {
  constructor(
    @InjectModel('Medicine')
    private MedicineModel: Model<MedicineI>,
  ) {}

  async getAll(documentsToSkip = 0, limitOfDocuments?: number): Promise<any> {
    const count = await this.MedicineModel.count();

    if (limitOfDocuments) {
      const medicines = await this.MedicineModel.find()
        .populate('diseases')
        .sort({ createdAt: -1 })
        .skip(documentsToSkip)
        .limit(limitOfDocuments);

      return { medicines, count };
    }

    const medicines = await this.MedicineModel.find()
      .populate('diseases')
      .sort({ createdAt: -1 });

    return { medicines, count };
  }

  async getOne(id: string): Promise<MedicineI> {
    const medicine: MedicineI = await this.MedicineModel.findById(id).populate(
      'diseases',
    );
    return medicine;
  }

  async createMedicine(body: MedicineDTO): Promise<MedicineI> {
    const {
      name,
      description,
      posology,
      high_price,
      diseases,
      principle,
      way,
    } = body;
    const newMedicine = new this.MedicineModel({
      name,
      description,
      posology,
      high_price,
      diseases,
      principle,
      way,
    });
    await newMedicine.save();
    return newMedicine;
  }

  async updateMedicine(id: string, body: any): Promise<MedicineI> {
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
