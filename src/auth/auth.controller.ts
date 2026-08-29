import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto, RegisterDto } from './dto/registerUser.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
