import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from '../auth/dto/registerUser.dto.js';
import { User, UserDocument } from './schemas/user.schema.js';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: RegisterDto) {
    return await this.userModel.create({
      fname: createUserDto.fname,
      lname: createUserDto.lname,
      email: createUserDto.email,
      password: createUserDto.password,
    });
  }
}
