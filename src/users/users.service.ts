import { CustomErrors } from './../utils/error';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { convertGqlUser } from '../convert/users';
import { SignInUserDto } from './dto/sing-in-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
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
      const accessToken = await this._createToken(createdUser.email);
      return { ...convertGqlUser(createdUser), accessToken: accessToken };
    } catch (error) {
      if (error.code === CustomErrors.AlreadyExists) {
        throw new ConflictException('Email Already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async signIn(inputSignIn: SignInUserDto) {
    const user = await this.userRepository.findOne({
      email: inputSignIn.email,
    });

    if (!user) {
      throw new NotFoundException('Unable to find user');
    }

    if (await bcrypt.compare(inputSignIn.password, user.password)) {
      const accessToken = await this._createToken(inputSignIn.email);
      return { ...convertGqlUser(user), accessToken: accessToken };
    }
    throw new UnauthorizedException('Please check your login credentials');
  }

  async _createToken(email: string): Promise<string> {
    const accessToken = await this.jwtService.signAsync({ username: email });
    return accessToken;
  }
}
