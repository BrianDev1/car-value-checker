import { User } from '../users/users.entity';

export const convertGqlUser = (userEntity: User) => {
  return {
    id: userEntity.id,
    email: userEntity.email,
    name: userEntity.name,
  };
};
