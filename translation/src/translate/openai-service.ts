import OpenAI from 'openai';
import { TranslateDTO, TranslateService } from './interface';

export class OpenAITranslateService implements TranslateService {
  private openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  async translate(payload: TranslateDTO): Promise<string> {
    const response = await this.openAI.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: `Translate '${payload.message}}' from English to ${payload.lng}`,
    });
    return response.choices[0].text;
  }
}
