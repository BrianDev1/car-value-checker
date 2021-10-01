import { GqlAuthGuard } from './authStrategy/user-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './users.entity';
import { SignInUserDto } from './dto/sing-in-user.dto';
import { CurrentUser } from 'src/decorators/user.decorators';
import { UseGuards } from '@nestjs/common';

@Resolver('User')
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  signIn(
    @Args('inputSignIn') inputSignIn: SignInUserDto,
    @CurrentUser() user: User,
  ) {
    console.log(user);
    return this.usersService.signIn(inputSignIn);
  }

  /* Test method for jwt */
  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return this.usersService.whoAmI(user);
  }

  @Mutation(() => User)
  signUp(@Args('inputCreateUser') inputCreateUser: CreateUserDto) {
    return this.usersService.signUp(inputCreateUser);
  }
}
