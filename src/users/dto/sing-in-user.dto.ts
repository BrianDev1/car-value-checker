import { IsEmail, IsNotEmpty } from 'class-validator';
import { InputSignIn } from '../../config/graphql.schema';

export class SignInUserDto implements InputSignIn {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
