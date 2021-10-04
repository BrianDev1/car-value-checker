import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication system (e2e)', () => {
  let app: INestApplication;

  /** Create User Input and Mutation */
  const createUserInput = {
    input: {
      name: 'Tester',
      email: 'newtester@t.test',
      password: 'Hello12345',
    },
  };

  const signUpUserQuery = `
    mutation signUp($input: InputCreateUser!){
    signUp(inputCreateUser: $input){
        id
        name
        email
        accessToken
        }
    }
  `;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('handles signup request', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: JSON.stringify(createUserInput),
        query: signUpUserQuery,
      })
      .expect(200)
      .then(({ body }) => {
        const data = body.data.signUp;
        expect(data.name).toBe(createUserInput.input.name);
        expect(data.email).toEqual(createUserInput.input.email);
      });
  });
});
