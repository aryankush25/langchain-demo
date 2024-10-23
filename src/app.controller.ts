import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('service') service: 'openai' | 'anthropic' | 'mistral') {
    return this.appService.getHello(service);
  }
}
