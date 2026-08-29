import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UserService } from '../user/user.service.js';
import { LoginDto, RegisterDto } from './dto/registerUser.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(registerUserDto: RegisterDto) {
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

    const payload = { sub: user._id };
    const token = await this.jwtService.signAsync(payload);

    console.log(token);

    return { accessToken: token };
  }

  // *login
  async login(loginUserDto: LoginDto) {
    const isUserExists = await this.userService.findUserByEmail(
      loginUserDto.email,
    );

    if (!isUserExists) {
      throw new UnauthorizedException('User not found!');
    }

    const isValidPass = await bcrypt.compare(
      loginUserDto.password,
      isUserExists.password,
    );
    if (!isValidPass) {
      throw new UnauthorizedException('Invalid password!');
    }

    const payload = { sub: isUserExists._id };
    const token = await this.jwtService.signAsync(payload);

    return { accessToken: token };
  }
}
