import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UserI } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserI>) {}

  async findOneByEmail(email: string): Promise<UserI | undefined> {
    return this.userModel.findOne({ email });
  }

  async getAllUsers(): Promise<UserI[]> {
    const users = await this.userModel
      .find()
      .populate('role_id')
      .populate('areas');
    return users;
  }

  async getUsersByRole(role_id: string): Promise<UserI[]> {
    const users = await this.userModel
      .find({ role_id })
      .populate('role_id')
      .populate('areas');
    return users;
  }

  async getUsersByArea(area_id: string): Promise<UserI[]> {
    const users = await this.userModel.aggregate([
      {
        $match: {
          areas: {
            $in: [area_id],
          },
        },
      },
      {
        $project: {
          name: { $concat: ['$first_name', ' ', '$last_name'] },
          phone: 1,
          email: 1,
          role_id: 1,
          areas: {
            $map: {
              input: '$areas',
              as: 'a',
              in: {
                $toObjectId: '$$a',
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: 'areas',
          let: {
            a: '$areas',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$_id', '$$a'],
                },
              },
            },
          ],
          as: 'areas',
        },
      },
      {
        $lookup: {
          from: 'roles',
          localField: 'role_id',
          foreignField: '_id',
          as: 'role',
        },
      },
      {
        $unwind: {
          path: '$role',
        },
      },
    ]);
    return users;
  }

  async getOneUser(id: string): Promise<any> {
    const user = await this.userModel
      .findById(id)
      .populate('role_id')
      .populate('areas');
    return {
      user,
    };
  }

  async getUserByDNI(dni: string): Promise<any> {
    const user = await this.userModel
      .findOne({ dni }, { password: 0 })
      .populate('role_id')
      .populate('areas');
    return {
      user,
    };
  }

  async createUser(user: any): Promise<UserI> {
    const {
      first_name,
      last_name,
      dni,
      email,
      password,
      birthdate,
      address,
      phone,
      parent_phone,
      pharmacyadmin,
      centeradmin,
      areas,
      role_id,
    } = user;
    const newUser = new this.userModel({
      first_name,
      last_name,
      dni,
      email,
      password,
      birthdate,
      address,
      phone,
      parent_phone,
      pharmacyadmin,
      centeradmin,
      areas,
      role_id,
    });
    await newUser.save();
    return newUser;
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
