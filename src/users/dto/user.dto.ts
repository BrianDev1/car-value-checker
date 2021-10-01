import { Expose } from 'class-transformer';
import { User } from '../../config/graphql.schema';

export class UserDto implements User {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;
}
