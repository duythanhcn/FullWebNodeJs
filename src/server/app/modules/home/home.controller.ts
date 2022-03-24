import { Controller, Get, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { parse } from 'url';

import { HomeService } from './home.service';

@Controller('/')
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Get('home')
  public async showHome(@Req() req: Request, @Res() res: Response) {
    console.log('come home');
    await this.homeService.handler(req, res);
  }

  // @Get('_next*')
  // public async assets(@Req() req: Request, @Res() res: Response) {
  //   await this.homeService.handler(req, res);
  // }

  // @Get('favicon.ico')
  // public async favicon(@Req() req: Request, @Res() res: Response) {
  //   await this.homeService.handler(req, res);
  // }
}
