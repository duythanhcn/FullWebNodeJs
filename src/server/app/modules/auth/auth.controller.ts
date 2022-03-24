import { Controller, UseGuards, Post, Request, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from './dto/authen.dto';
import { BaseController } from '../../../vendors/base/base.controller';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() body: LoginDto) {
    const accessToken = await this.authService.login(body);
    return this.response(accessToken);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
