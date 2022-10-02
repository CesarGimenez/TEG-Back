import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { roleDTO } from './dto/role.dto';
import { RoleI } from './interface/role.interface';

@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private roleModel: Model<RoleI>) {}

  async getAllRoles(): Promise<RoleI[]> {
    const roles: RoleI[] = await this.roleModel.find();
    return roles;
  }

  async createRole(role: roleDTO): Promise<RoleI> {
    const { type, name, description } = role;
    const newRole = new this.roleModel({
      type,
      name,
      description,
    });
    await newRole.save();
    return newRole;
  }

  async updateRole(id: string, body: roleDTO): Promise<RoleI> {
    const role: RoleI = await this.roleModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return role;
  }

  async deleteRole(id: string): Promise<any> {
    const roleDeleted = await this.roleModel.findByIdAndDelete(id);
    return { roleDeleted };
  }
}
