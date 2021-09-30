import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signUp(inputCreateUser: CreateUserDto) {
    const salter = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(inputCreateUser.password, salter);

    const newUser = this.userRepository.create({
      name: inputCreateUser.name,
      email: inputCreateUser.email,
      password: hashedPwd,
    });

    try {
      const createdUser = await this.userRepository.save(newUser);
      return {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email Already exists');
      }
      throw new InternalServerErrorException();
    }
  }
}
