import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserI } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserI>) {}

  async getAllUsers(): Promise<UserI[]> {
    const users = await this.userModel.find();
    return users;
  }

  async createUser(user: any): Promise<UserI> {
    const {
      first_name,
      last_name,
      email,
      password,
      birthdate,
      address,
      phone,
    } = user;
    const newUser = new this.userModel({
      first_name,
      last_name,
      email,
      password,
      birthdate,
      address,
      phone,
    });
    await newUser.save();
    return newUser;
  }

  async getOneUser(id: string): Promise<any> {
    const user = await this.userModel.findById(id);
    return {
      user,
    };
  }

  async updateUser(id: string, body: any): Promise<any> {
    const user = await this.userModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return {
      user,
    };
  }

  async deleteUser(id: string): Promise<any> {
    const userDeleted = await this.userModel.findByIdAndDelete(id);
    return { userDeleted };
  }
}
