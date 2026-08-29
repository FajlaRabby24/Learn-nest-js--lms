import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/registerUser.dto.js';

@Controller('auth')
export class AuthController {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post('register')
  register(@Body() registerUserDto: RegisterDto) {
    const result = this.authService.registerUser(registerUserDto);
    return result;
  }
}
