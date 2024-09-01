import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { TranslateDTO } from './translate/interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);

  @MessagePattern({ cmd: 'translate' })
  async translate(payload: TranslateDTO): Promise<string> {
    this.logger.log('translate service called', { payload });
    return await this.appService.translate(payload);
  }
}
