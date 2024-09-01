import { Body, Controller, Inject, Logger, Post, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TranslateDTO } from './translate';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(@Inject('CHAT_TRANSLATION_SERVICE') private client: ClientProxy) {}
  private readonly logger = new Logger(AppController.name);

  @Post('/translate')
  async translate(@Body(new ValidationPipe({transform: true})) payload: TranslateDTO) {
    this.logger.log("Translate api called!", { payload })
    return {
      data: await firstValueFrom(this.client.send({ cmd: "translate" }, payload))
    };
  }
}
