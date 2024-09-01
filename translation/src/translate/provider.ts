import { Provider } from '@nestjs/common';
import { TranslateService } from './interface';
// import { OpenAITranslateService } from './openai-service';
import { MockTranslateService } from './mock-service';

export const translateServiceProvider: Provider = {
  provide: TranslateService,
  useClass: MockTranslateService,
};
