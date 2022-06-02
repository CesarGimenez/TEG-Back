import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AreaI } from './interface/area.interface';

@Injectable()
export class AreaService {
  constructor(@InjectModel('Area') private areaModel: Model<AreaI>) {}

  async getAllAreas(): Promise<AreaI[]> {
    const areas = await this.areaModel.find();
    return areas;
  }

  async createArea(area: any): Promise<any> {
    const { name, description } = area;
    const newArea = new this.areaModel({
      name,
      description,
    });
    await newArea.save();
    return newArea;
  }

  async updateArea(id: string, area: any): Promise<any> {
    const updateArea = await this.areaModel.findByIdAndUpdate(id, area, {
      new: true,
    });
    return updateArea;
  }

  async deleteArea(id: string): Promise<any> {
    const areaDeleted = await this.areaModel.findByIdAndDelete(id);
    return { areaDeleted };
  }
}
