import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { InputCreateUser } from '../../config/graphql.schema';

export class CreateUserDto implements InputCreateUser {
  @IsNotEmpty()
  @MinLength(3, { message: 'Name is too short' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(4, { message: 'Password must be longer!' })
  @MaxLength(20, { message: 'Too long' })
  password: string;
}
