import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HealthCenterI } from './interface/healthcenter.interface';

@Injectable()
export class HealthcenterService {
  constructor(
    @InjectModel('Healthcenter')
    private HealthCenterModel: Model<HealthCenterI>,
  ) {}

  async getAll(documentsToSkip = 0, limitOfDocuments?: number): Promise<any> {
    let healthcenters = await this.HealthCenterModel.find().populate('doctors');
    const count = await this.HealthCenterModel.find().count();

    if (limitOfDocuments) {
      healthcenters = await this.HealthCenterModel.find()
        .populate('doctors')
        .sort({ createdAt: -1 })
        .skip(documentsToSkip)
        .limit(limitOfDocuments);
    }
    return { healthcenters, count };
  }

  async getOne(id: string): Promise<HealthCenterI> {
    const healthcenter = await this.HealthCenterModel.findById(id).populate(
      'doctors',
    );
    return healthcenter;
  }

  async getByDoctor(doctor_id: string): Promise<any> {
    const healthcenters = await this.HealthCenterModel.find({
      doctors: { $in: [doctor_id] },
    });
    return healthcenters;
  }

  async createHealthCenter(body: any): Promise<any> {
    const { name, location, address, phones, is_public, doctors } = body;
    const newHC = new this.HealthCenterModel({
      name,
      location,
      address,
      phones,
      is_public,
      doctors,
    });
    await newHC.save();
    return newHC;
  }

  async updateHealthCenter(id: string, body: any): Promise<any> {
    const updateHC = await this.HealthCenterModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return updateHC;
  }

  async deleteHealthCenter(id: string): Promise<any> {
    const HcDeleted = await this.HealthCenterModel.findByIdAndDelete(id);
    return { HcDeleted };
  }
}
