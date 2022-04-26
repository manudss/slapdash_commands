import { Injectable } from '@nestjs/common';
import {
  CommandResponse,
  Config,
  FormField,
} from '@slapdash/command-response-types';
import { GoogleItems } from './google.model';

import { google } from 'googleapis';

@Injectable()
export class GoogleService {
  customsearch = google.customsearch('v1');

  constructor() {}
  // fetch google search  result and convert to CommandResult
  async search(
    query: string,
    cx: string = null,
    apiKey = null,
  ): Promise<CommandResponse> {
    try {
      const res = await this.customsearch.cse.list({
        cx: cx,
        q: query,
        auth: apiKey,
      });
      return {
        view: {
          type: 'list',
          ranking: false,
          options: res.data.items.map((googleitem: GoogleItems) => {
            return {
              title: `${googleitem.title} - ${googleitem.displayLink}`,
              subtitle: `${googleitem.snippet}`,
              action: {
                type: 'open-url',
                url: googleitem.link,
              },
            };
          }),
        },
        inputPlaceholder: 'Type to search query',
      };
    } catch (error) {
      console.error('Error', error);
      return {
        view: {
          type: 'list',
          ranking: false,
          options: [],
        },
        inputPlaceholder: 'Error while searching',
      };
    }
  }

  async searchOrGetConfigForm(
    query: string,
    cx: string = null,
    apiKey: string = null,
  ): Promise<CommandResponse> {
    if (!cx || !apiKey) {
      return this.getConfigForm(cx, apiKey);
    } else if (!query) {
      return {
        view: 'Working',
        inputPlaceholder: 'Type a search query',
      };
    }
    return this.search(query, cx, apiKey);
  }

  public getConfigForm(
    cx: string = null,
    apiKey: string = null,
  ): { config: Config } {
    const fields: FormField[] = [];
    if (!cx) {
      fields.push({
        type: 'text',
        id: 'cx',
        required: true,
        label: 'The identifier of the Programmable Search Engine. CX',
        placeholder: 'Enter Custom Search Engine CX',
        helpText: `Get an api key from https://developers.google.com/custom-search/v1/overview and paste it here. The will give you access to the api of search. You can create a free api keys, if use with custom search engine id. 
        \n If you use it with custom search ID (cx) You can create a custom search with less than 10 websites, for free limited request.`,
      });
    }
    if (!apiKey) {
      fields.push({
        type: 'text',
        id: 'apiKey',
        required: true,
        label: 'Google API Key',
        placeholder: 'Enter Google API Key',
        helpText: `You can configure a Custom Search Engine ID in the google page, under the "Custom Search Engine" section. Define a list of website where Google will search for your query. 
        \n Or use a paid api keys, to have unlimited access to the api of search. Find more information at https://cse.google.com/
        \n If you use it with custom search ID (cx) You can create a custom search with less than 10 websites, or search in the all web.`,
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
}
