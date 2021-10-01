import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './users.entity';
import { SignInUserDto } from './dto/sing-in-user.dto';

@Resolver('User')
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  signIn(@Args('inputSignIn') inputSignIn: SignInUserDto) {
    return this.usersService.signIn(inputSignIn);
  }

  @Mutation(() => User)
  signUp(@Args('inputCreateUser') inputCreateUser: CreateUserDto) {
    return this.usersService.signUp(inputCreateUser);
  }
}
