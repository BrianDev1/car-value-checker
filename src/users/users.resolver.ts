import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './users.entity';

@Resolver('User')
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => User)
  signUp(@Args('inputCreateUser') inputCreateUser: CreateUserDto) {
    return this.usersService.signUp(inputCreateUser);
  }
}
