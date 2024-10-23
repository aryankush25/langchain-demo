import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  pingAI(@Query('service') service: 'openai' | 'anthropic' | 'mistral') {
    return this.appService.pingAI(service);
  }
}
