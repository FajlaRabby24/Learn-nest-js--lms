import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from '../auth/dto/registerUser.dto.js';
import { User, UserDocument } from './schemas/user.schema.js';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // * create user
  async createUser(createUserDto: RegisterDto) {
    try {
      return await this.userModel.create({
        fname: createUserDto.fname,
        lname: createUserDto.lname,
        email: createUserDto.email,
        password: createUserDto.password,
      });
    } catch (error: any) {
      const DUPLICATE_KEY_CODE = 11000;
      if (error.code === DUPLICATE_KEY_CODE) {
        throw new ConflictException('Email is already taken!');
      }

      throw error;
    }
  }

  // * find user by email
  async findUserByEmail(email: string) {
    const user = this.userModel.findOne({ email });
    return user;
  }
}
