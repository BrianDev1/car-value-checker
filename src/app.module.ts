import { Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config/config.schema';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema: configValidationSchema,
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ssl: process.env.NODE_ENV === 'prod',
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        // Global pipe
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
