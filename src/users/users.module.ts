import { JwtStrategy } from './authStrategy/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UserResolver } from './users.resolver';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => {
        return {
          secret: ConfigService.get('JWT_SECRET'),
          signOptions: { expiresIn: '500s' },
        };
      },
    }),
  ],
  providers: [UsersService, UserResolver, JwtStrategy],
})
export class UsersModule {}
