import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { UserI } from './interface/user.interface';
import { queryUserDto } from './dto/query-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<UserI>,
    @InjectModel('Disease') private diseaseModel: Model<any>,
  ) {}

  async findOneByEmail(email: string): Promise<any> {
    return await this.userModel
      .findOne({ email })
      .populate('pharmacyadmin centeradmin areas role_id');
  }

  async getAllUsers(
    documentsToSkip = 0,
    limitOfDocuments?: number,
  ): Promise<any> {
    try {
      const count = await this.userModel.find().count();
      let users = await this.userModel
        .find()
        .populate('role_id')
        .populate('areas');

      if (limitOfDocuments) {
        users = await this.userModel
          .find()
          .populate('role_id')
          .populate('areas')
          .sort({ createdAt: -1 })
          .skip(documentsToSkip)
          .limit(limitOfDocuments);
      }
      return { users, count };
    } catch (error) {
      console.log(error);
    }
  }

  async getUsersByRole(role_id: string): Promise<UserI[]> {
    const users = await this.userModel
      .find({ role_id })
      .populate('role_id')
      .populate('areas');
    return users;
  }

  async getUsersByArea(body: any): Promise<any> {
    const { areas } = body;
    if (areas.length < 1) {
      return await this.userModel
        .find({ is_doctor: true })
        .populate('areas role_id');
    }
    const users2 = await this.userModel
      .find({ areas: { $in: areas } })
      .populate('areas role_id');
    return users2;
  }

  async getDoctorsByDisease(disease_id: string): Promise<any> {
    const area_disease = await this.diseaseModel.aggregate([
      {
        $project: {
          _id: {
            $convert: {
              input: '$_id',
              to: 'string',
            },
          },
          areas: 1,
        },
      },
      {
        $match: {
          _id: disease_id,
        },
      },
      {
        $project: {
          // areas: {
          //   $map: {
          //     input: '$areas',
          //     as: 'area',
          //     in: { $toString: '$$area' },
          //   },
          // },
          _id: 0,
        },
      },
    ]);
    const { areas } = area_disease[0];

    const doctors = await this.userModel.aggregate([
      {
        $match: {
          areas: {
            $in: areas,
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
    ]);
    return doctors;
  }

  async getOneUser(id: string): Promise<any> {
    const user = await this.userModel
      .findById(id)
      .populate('role_id')
      .populate('areas');
    return user;
  }

  async getUserByDNI(dni: string): Promise<any> {
    const user = await this.userModel
      .findOne({ dni }, { password: 0 })
      .populate('role_id')
      .populate('areas');
    return user;
  }

  async createUser(user: any): Promise<UserI> {
    try {
      const { password } = user;
      const hashPassword = await hash(password, 10);
      user = { ...user, password: hashPassword };
      const newUser = new this.userModel(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(id: string, body: any): Promise<any> {
    // const { password } = body;
    // const hashPassword = await hash(password, 10);
    // body = { ...body, password: hashPassword };
    try {
      const user = await this.userModel.findByIdAndUpdate(id, body, {
        new: true,
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async changePassword(id: string, body: any): Promise<any> {
    const { password, confirmPassword } = body;
    if (password === confirmPassword) {
      const hashPassword = await hash(password, 10);
      body = { ...body, password: hashPassword };
      const user = await this.userModel.findByIdAndUpdate(id, body, {
        new: true,
      });
      return user;
    } else {
      return {
        msg: 'Las contrase;as no coinciden',
      };
    }
  }

  async deleteUser(id: string): Promise<any> {
    const userDeleted = await this.userModel.findByIdAndDelete(id);
    return { userDeleted };
  }

  async uploadImageUser(image: string, id: string): Promise<any> {
    if (!image) {
      return {
        msg: 'No se envio ninguna imagen',
      };
    }
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { image },
      { new: true },
    );
    return user;
  }

  async findUserByQuery(
    first_name: string,
    last_name: string,
    dni: string,
  ): Promise<any> {
    try {
      let query = {};
      if (first_name) query = { ...query, first_name };
      if (last_name) query = { ...query, last_name };
      if (dni) query = { ...query, dni };
      const users = await this.userModel.find(query);
      return users;
    } catch (error) {}
  }
}
