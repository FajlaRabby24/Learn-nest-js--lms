import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UserService } from '../user/user.service.js';
import { RegisterDto } from './dto/registerUser.dto.js';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async registerUser(registerUserDto: RegisterDto) {
    console.log('resiget dto', registerUserDto);
    // logic for user register
    /**
     * 1. check if email already exist
     * 2. hash the pass
     * 3. store the user into db
     * 4. generate jwt token
     * 5. send token in response
     */

    const saltRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltRounds);

    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });

    console.log('created user: ', user);
    return user;
  }
}
