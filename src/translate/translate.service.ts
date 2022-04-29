import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  CommandResponse,
  Config,
  FormField,
  SelectOption,
} from '@slapdash/command-response-types';
import { AxiosResponse } from 'axios';
import * as deepl from 'deepl-node';
import { TargetLanguageCode, TextResult } from 'deepl-node';
import { firstValueFrom } from 'rxjs';
import {
  TranslateBody,
  Translation,
  TranslationsResponses,
} from './translate.model';

@Injectable()
export class TranslateService {
  constructor(private readonly httpService: HttpService) {}

  public getConfigForm(
    apiKey: string = null,
    displayResult: string = null,
  ): { config: Config } {
    const fields: FormField[] = [];

    if (!apiKey) {
      fields.push({
        type: 'text',
        id: 'apiKey',
        required: true,
        label: 'Deepl API Key',
        placeholder: 'Enter Deepl API Key',
        helpText: `You need to provide your API authentication key for Deepl API as found in your [DeepL Pro Account)(https://www.deepl.com/pro-account/).. 
               \n You can access the DeepL API with either a [DeepL API Free or DeepL API Pro plan](https://www.deepl.com/pro#developer) .
                \n With the DeepL API Free plan, you can translate up to 500,000 characters per month for free.     
                \nThis keys will not by store by this api, it will remain in slapdash and will be used for all requests.         
       `,
      });
    }
    if (!displayResult) {
      fields.push({
        type: 'select',
        id: 'displayResult',
        required: true,
        label: 'Which display to use for display translated result',
        options: [
          {
            value: 'simple',
            label: 'Simple return value (default)',
          },
          {
            value: 'list',
            label: 'Display result in list copy action',
          },
          {
            value: 'paste',
            label: 'Paste directly the translated message',
          },
          {
            value: 'form',
            label: 'Display in a new Form (beta)',
          },
        ],
        helpText: `Define how to display the result of the translation. 
               \n * Simple return value (default) : return the translation in a simple string.
               \n * Display result in list copy action : return the translation in one list item with copy action. The text will be in one line.
               \n * Paste directly the translated message : paste the translation in your current application, or copy in the clipboard.        
               \n * Form (beta) : return the translation in a form, to translate again.          
       `,
      });
    }
    return {
      config: {
        form: {
          fields,
        },
      },
    };
  }

  private readonly targetLang: SelectOption[] = [
    { value: 'en-US', label: 'English (American) (en-US)' },
    { value: 'en-GB', label: 'English (British) (en-GB)' },
    { value: 'fr', label: 'Français (fr)' },
    { value: 'de', label: 'German (de)' },
    { value: 'es', label: 'Spanish (es)' },
    { value: 'pt-BR', label: 'Portuguese (Brazilian) (pt-BR)' },
    { value: 'pt-PT', label: 'Portuguese (pt-PT)' },
    { value: 'zh', label: 'Chinese (zh)' },
    { value: 'ja', label: 'Japanese (ja)' },
    { value: 'bg', label: 'Bulgarian (bg)' },
    { value: 'cs', label: 'Czech (cs)' },
    { value: 'da', label: 'Danish (da)' },
    { value: 'el', label: 'Greek (el)' },
    { value: 'et', label: 'Estonian (et)' },
    { value: 'fi', label: 'Finnish (fi)' },
    { value: 'hu', label: 'Hungarian (hu)' },
    { value: 'it', label: 'Italian (it)' },
    { value: 'lt', label: 'Lithuanian (lt)' },
    { value: 'lv', label: 'Latvian (lv)' },
    { value: 'nl', label: 'Dutch (nl)' },
    { value: 'pl', label: 'Polish (pl)' },
    { value: 'ro', label: 'Romanian (ro)' },
    { value: 'ru', label: 'Russian (ru)' },
    { value: 'sk', label: 'Slovak (sk)' },
    { value: 'sl', label: 'Slovenian (sl)' },
    { value: 'sv', label: 'Swedish (sv)' },
  ];

  private readonly sourceLang: SelectOption[] = [
    { value: '', label: 'Auto detect' },
    { value: 'en', label: 'English (en)' },
    { value: 'fr', label: 'French (fr)' },
    { value: 'de', label: 'German (de)' },
    { value: 'zh', label: 'Chinese (zh)' },
    { value: 'ja', label: 'Japanese (ja)' },
    { value: 'es', label: 'Spanish (es)' },
    { value: 'pt', label: 'Portuguese (pt)' },
    { value: 'bg', label: 'Bulgarian (bg)' },
    { value: 'cs', label: 'Czech (cs)' },
    { value: 'da', label: 'Danish (da)' },
    { value: 'el', label: 'Greek (el)' },
    { value: 'et', label: 'Estonian (et)' },
    { value: 'fi', label: 'Finnish (fi)' },
    { value: 'hu', label: 'Hungarian (hu)' },
    { value: 'it', label: 'Italian (it)' },
    { value: 'lt', label: 'Lithuanian (lt)' },
    { value: 'lv', label: 'Latvian (lv)' },
    { value: 'nl', label: 'Dutch (nl)' },
    { value: 'pl', label: 'Polish (pl)' },
    { value: 'ro', label: 'Romanian (ro)' },
    { value: 'ru', label: 'Russian (ru)' },
    { value: 'sk', label: 'Slovak (sk)' },
    { value: 'sl', label: 'Slovenian (sl)' },
    { value: 'sv', label: 'Swedish (sv)' },
  ];

  async getFormOrGetConfigForm(
    query: string,
    apiKey: string,
    displayForm: string,
  ): Promise<CommandResponse> {
    if (!apiKey) {
      return this.getConfigForm(apiKey, displayForm);
    } else {
      return {
        view: {
          type: 'form',
          submitLabel: 'Translate',
          method: 'post',
          fields: [
            [
              {
                type: 'select',
                id: 'from',
                label: 'Source Langue',
                placeholder: 'Detect source',
                options: this.sourceLang,
              },
              {
                type: 'select',
                id: 'to',
                label: 'Target Langue',
                placeholder: 'Choose target',
                options: this.targetLang,
              },
            ],
            {
              type: 'text',
              id: 'text',
              label: 'Text to translate',
              multiline: true,
              required: true,
            },
          ],
        },
      };
    }
  }

  async translate(
    body: TranslateBody,
    apiKey: string,
    displayForm = 'view',
  ): Promise<CommandResponse> {
    const result: AxiosResponse<TranslationsResponses> = await firstValueFrom(
      this.httpService.get<TranslationsResponses>(
        'https://api-free.deepl.com/v2/translate',
        {
          params: {
            text: body.text,
            auth_key: apiKey,
            target_lang: body.to,
            source_lang: body.from ?? undefined,
          },
          proxy: false,
        },
      ),
    );

    const textResult: Translation = result.data.translations[0];
    switch (displayForm) {
      case 'form':
        return this.returnWithForm(textResult, body);
      case 'list':
        return this.returnInListView(textResult, body);
      case 'paste':
        return this.returnPasteInApplication(textResult);
      case 'view':
      default:
        return this.returnInSimpleView(textResult);
    }
  }

  private returnInSimpleView(
    textResult: Translation,
  ): Promise<CommandResponse> {
    return Promise.resolve({ view: textResult.text });
  }

  private returnPasteInApplication(
    textResult: Translation,
  ): Promise<CommandResponse> {
    return Promise.resolve({
      action: {
        type: 'paste',
        value: textResult.text,
      },
    });
  }

  private returnWithForm(
    textResult: Translation,
    body: TranslateBody,
  ): Promise<CommandResponse> {
    const translatedTextFields: FormField = {
      type: 'text',
      id: 'translated',
      label: 'Text translated',
      multiline: true,
      defaultValue: textResult.text.replace('\n', ''),
      helpText: textResult.text,
    };
    const textFields: FormField = {
      type: 'text',
      id: 'text',
      label: 'Text to translate',
      multiline: true,
      defaultValue: body.text,
      required: true,
    };
    return Promise.resolve({
      view: {
        type: 'form',
        submitLabel: 'copy',
        method: 'post',
        fields: [
          [
            {
              type: 'select',
              id: 'from',
              label: 'Source Langue',
              placeholder: 'Detect source',
              defaultValue:
                textResult.detected_source_language?.toLowerCase() ?? body.from,
              options: this.sourceLang,
            },
            {
              type: 'select',
              id: 'to',
              label: 'Target Langue',
              placeholder: 'Detect target',
              required: true,
              defaultValue: body.to,
              options: this.targetLang,
            },
          ],
          textFields,
          translatedTextFields,
        ],
      },
    });
  }

  async translateDeepl(
    query: string,
    apiKey: string,
  ): Promise<CommandResponse> {
    const translator = new deepl.Translator(apiKey, {
      serverUrl: 'api-free.deepl.com',
      maxRetries: 3,
      minTimeout: 5000,
    });
    const targetLang: TargetLanguageCode = 'en-US';
    const result: TextResult = await translator.translateText(
      query,
      null,
      targetLang,
    );
    return {
      view: {
        type: 'list',
        ranking: false,
        options: [
          {
            title: result.text,
            subtitle: `${result.detectedSourceLang} -> ${targetLang}`,
            icon: 'translate',
            action: {
              type: 'paste',
              value: result.text,
            },
          },
        ],
      },
    };
  }

  private returnInListView(
    textResult: Translation,
    body: TranslateBody,
  ): Promise<CommandResponse> {
    return Promise.resolve({
      view: {
        type: 'list',
        ranking: false,
        options: [
          {
            title: textResult.text,
            subtitle: `${textResult.detected_source_language ?? body.from} -> ${
              body.to
            }`,
            icon: '📋',
            action: {
              type: 'paste',
              value: textResult.text,
            },
          },
        ],
      },
    });
  }
}
