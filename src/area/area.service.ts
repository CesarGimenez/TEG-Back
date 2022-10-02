import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { areaDTO } from './dto/area.dto';
import { AreaI } from './interface/area.interface';

@Injectable()
export class AreaService {
  constructor(@InjectModel('Area') private areaModel: Model<AreaI>) {}

  async getAllAreas(): Promise<AreaI[]> {
    const areas: AreaI[] = await this.areaModel.find();
    return areas;
  }

  async createArea(area: areaDTO): Promise<AreaI> {
    const { name, description } = area;
    const newArea = new this.areaModel({
      name,
      description,
    });
    await newArea.save();
    return newArea;
  }

  async updateArea(id: string, area: areaDTO): Promise<AreaI> {
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
