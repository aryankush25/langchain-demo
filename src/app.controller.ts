import { Body, Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  pingAI(
    @Query('service')
    service: 'openai' | 'anthropic' | 'mistral' | 'google',
    @Body('query') userQuery: string,
  ) {
    return this.appService.pingAI(service, userQuery);
  }
}
