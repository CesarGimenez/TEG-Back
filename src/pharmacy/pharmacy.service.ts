import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MedicineArrayDTO } from './dto/pharmacy.dto';
import { PharmacyI } from './interface/pharmacy.interface';

@Injectable()
export class PharmacyService {
  constructor(
    @InjectModel('Pharmacy')
    private pharmacyModel: Model<PharmacyI>,
  ) {}

  async getAll(): Promise<PharmacyI[]> {
    const pharmacies = await this.pharmacyModel.find().populate('medicines');
    return pharmacies;
  }

  async getOne(id: string): Promise<PharmacyI> {
    const pharmacy: PharmacyI = await this.pharmacyModel
      .findById(id)
      .populate('medicines');
    return pharmacy;
  }

  async getByMedicine(data: MedicineArrayDTO): Promise<PharmacyI[]> {
    const { medicines } = data;
    if (medicines.length <= 0) {
      return await this.pharmacyModel.find();
    }
    const pharmacies = await this.pharmacyModel.find({
      medicines: { $in: medicines },
    });
    return pharmacies;
  }

  async createPharmacy(body: any): Promise<any> {
    const { name, location, address, phones, medicines } = body;
    const newPharmacy = new this.pharmacyModel({
      name,
      location,
      address,
      phones,
      medicines,
    });
    await newPharmacy.save();
    return newPharmacy;
  }

  async updatePharmacy(id: string, body: any): Promise<any> {
    const updatePharmacy = await this.pharmacyModel.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
      },
    );
    return updatePharmacy;
  }

  async deletePharmacy(id: string): Promise<any> {
    const pharmacyDeleted = await this.pharmacyModel.findByIdAndDelete(id);
    return { pharmacyDeleted };
  }
}
