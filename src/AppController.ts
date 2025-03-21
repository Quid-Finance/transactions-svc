import { Controller, Get } from '@nestjs/common';
import { AppService } from './AppService';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  health(): string {
    return 'OK';
  }
}
