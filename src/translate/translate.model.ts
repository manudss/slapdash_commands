import { SourceLanguageCode, TargetLanguageCode } from 'deepl-node/dist/types';

export interface TranslateBody {
  text: string;
  from: SourceLanguageCode;
  to: TargetLanguageCode;
}

export interface Translation {
  text: string;
  detected_source_language: string;
}

export interface TranslationsResponses {
  translations: Translation[];
}
