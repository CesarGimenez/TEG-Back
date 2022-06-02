import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleI } from './interface/role.interface';

@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private roleModel: Model<RoleI>) {}

  async getAllRoles(): Promise<RoleI[]> {
    const roles = await this.roleModel.find();
    return roles;
  }

  async getOneRole(): Promise<any> {
    const role = await this.roleModel.find();
    return role;
  }

  async createRole(role: any): Promise<any> {
    const { type, name, description } = role;
    const newRole = new this.roleModel({
      type,
      name,
      description,
    });
    await newRole.save();
    return newRole;
  }

  async updateRole(id: string, body: any): Promise<any> {
    const role = await this.roleModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return {
      role,
    };
  }

  async deleteRole(id: string): Promise<any> {
    const roleDeleted = await this.roleModel.findByIdAndDelete(id);
    return { roleDeleted };
  }
}
