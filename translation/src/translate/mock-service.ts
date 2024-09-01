import { TranslateDTO, TranslateService } from './interface';

export class MockTranslateService implements TranslateService {
  async translate(payload: TranslateDTO): Promise<string> {
    await this.delay(3000);
    return 'Mock translated message: ' + payload.message + ' to ' + payload.lng;
  }

  async delay(ms: number): Promise<void> {
    return await new Promise((res) => {
      setTimeout(() => {
        res();
      }, ms);
    });
  }
}
