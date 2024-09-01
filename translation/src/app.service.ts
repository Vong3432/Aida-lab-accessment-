import { Injectable } from '@nestjs/common';
import { TranslateDTO, TranslateService } from './translate/interface';

@Injectable()
export class AppService {
  constructor(private translateService: TranslateService) {}

  async translate(payload: TranslateDTO): Promise<string> {
    return await this.translateService.translate(payload);
  }
}
