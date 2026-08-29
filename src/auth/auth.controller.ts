import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { AuthGuard } from './auth.guard.js';
import { AuthService } from './auth.service.js';
import { LoginDto, RegisterDto } from './dto/registerUser.dto.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterDto) {
    const token = await this.authService.registerUser(registerUserDto);
    return token;
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginDto) {
    const token = await this.authService.login(loginUserDto);
    return token;
  }

  // * GET PROFILE
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    const userId = req.user.sub;
    const user = await this.userService.findUserById(userId);
    return user;
  }
}
