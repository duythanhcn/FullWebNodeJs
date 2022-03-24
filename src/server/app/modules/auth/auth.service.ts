import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private userService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw Error('Email not found');
    }
    // const passwordMatched = bcrypt.compareSync(password, user.password); // true
    if (password === user.password) {
      return { email: user.email, userId: user.userId };
    }
  }

  async login(user: any) {
    return {
      accessToken: this.jwtService.sign(user),
    };
  }
}
