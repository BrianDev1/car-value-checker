import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
