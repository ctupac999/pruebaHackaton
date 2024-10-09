import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ActivityModule } from './activity/activity.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://cristiands9999:8sEQ9xapr4LZmPRp@nestnew.1yb53.mongodb.net/'),
    UsersModule,ActivityModule,
  ],
})
export class AppModule {}
