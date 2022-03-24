import { Module, OnModuleInit, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LoggerModule } from './common/logger/logger.module';
import { UsersModule } from './app/modules/users/users.module';
import { CategoriesModule } from './app/modules/categories/categories.module';
import { HomeModule } from './app/modules/home/home.module';
import { AuthModule } from './app/modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as joi from '@hapi/joi';
import mySql from './configs/db/mySql';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [],
      isGlobal: true,
      validationSchema: joi.object({
        DB_CONNECTION: joi.string().required(),
        DB_PORT: joi.string().required(),
        DB_USERNAME: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        DB_DATABASE: joi.string().required(),
        DB_HOST: joi.string().required(),
        JWT_SECRET_KEY: joi.string().required(),
        JWT_EXPIRE_TIME: joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot(mySql),
    AuthModule,
    UsersModule,
    LoggerModule,
    CategoriesModule,
    HomeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
