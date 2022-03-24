import { Module } from '@nestjs/common';

import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  imports: [],
  providers: [HomeService],
  controllers: [HomeController],
})
export class HomeModule {}
