import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ActivityModule } from './activity/activity.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    ActivityModule,
  ],
})
export class AppModule {}
