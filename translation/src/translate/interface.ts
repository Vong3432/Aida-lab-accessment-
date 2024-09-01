export interface TranslateDTO {
  message: string;
  lng: 'Chinese';
}

export abstract class TranslateService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async translate(payload: TranslateDTO): Promise<string> {
    return '';
  }
}
