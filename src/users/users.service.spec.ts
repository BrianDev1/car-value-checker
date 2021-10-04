import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUserService = {
      signUp: (inputCreateUser: CreateUserDto) =>
        Promise.resolve({
          id: 1,
          name: inputCreateUser.name,
          email: inputCreateUser.email,
          accessToken: 'hsidhsudhusd',
        }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: UsersService, useValue: fakeUserService }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create user', async () => {
    const newUser = await fakeUserService.signUp({
      name: 'Tester',
      email: 't@t.t',
      password: 'iusdhsjds',
    });
    expect(newUser.id).toBe(1);
  });
});
