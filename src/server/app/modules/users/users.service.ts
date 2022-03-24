import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ModelBase } from '../../../vendors/base/base.model';
import { User } from '../../entities/user.entity';
import { CreateUserInputDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';

/**
 * Why need repository
 * https://stackoverflow.com/questions/52030009/nestjs-with-typeorm-when-using-custom-repository-is-a-service-needed-anymore
 */
@Injectable()
export class UsersService {
  constructor(
    private logger: Logger,
    @InjectRepository(User)
    private userRepository: UserRepository
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  async getById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async setUserInfor(user: User): Promise<boolean> {
    try {
      await this.userRepository.save(user);
      return true;
    } catch (ex) {
      return false;
    }
  }

  /**
   *
   *
   * @author ThanhLD
   * @param {CreateUserInputDto} { email, fullname, gender }
   * @returns {Promise<boolean>}
   * @memberof UsersService
   */
  async create({ email, fullname, gender, password }: CreateUserInputDto): Promise<boolean> {
    try {
      const user = new User();
      user.email = email;
      user.gender = gender;
      user.fullname = fullname;
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(password, salt);
      user.accessToken = '';
      user.refreshToken = '';
      await this.userRepository.save(user);
    } catch (ex) {
      this.logger.error(ex);
      return false;
    }
    return true;
  }

  async deleteUser(user: User): Promise<boolean> {
    try {
      await this.userRepository.delete(user);
    } catch (ex) {
      return false;
    }
    return true;
  }
}
