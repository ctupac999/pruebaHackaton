import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [UsersModule, ActivityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
