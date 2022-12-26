import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { areaDTO } from './dto/area.dto';
import { AreaI } from './interface/area.interface';

@Injectable()
export class AreaService {
  constructor(@InjectModel('Area') private areaModel: Model<AreaI>) {}

  async getAllAreas(
    documentsToSkip = 0,
    limitOfDocuments?: number,
  ): Promise<any> {
    try {
      const count: number = await this.areaModel.find().count();
      let areas: AreaI[] = await this.areaModel.find();
      if (limitOfDocuments) {
        areas = await this.areaModel
          .find()
          .sort({ createdAt: -1 })
          .skip(documentsToSkip)
          .limit(limitOfDocuments);
      }
      return { areas, count };
    } catch (error) {
      throw new Error('Ha ocurrido un error en servidor');
    }
  }

  async createArea(area: areaDTO): Promise<AreaI> {
    const { name, description, active } = area;
    const newArea = new this.areaModel({
      name,
      description,
      active,
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
