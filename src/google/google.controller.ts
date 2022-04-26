import { Controller, Get, Headers, Query } from '@nestjs/common';
import { CommandResponse } from '@slapdash/command-response-types';
import { CopyType } from '../gitmoji/gimojis.model';
import { GoogleItems } from './google.model';
import { GoogleService } from './google.service';

@Controller('google')
export class GoogleController {
  constructor(private googleService: GoogleService) {}

  @Get('/')
  async searchGoogle(
    @Query('keywords') query: string,
    @Headers('apiKey') apiKey: string,
    @Headers('cx') cx: string,
  ): Promise<CommandResponse> {
    return await this.googleService.searchOrGetConfigForm(query, cx, apiKey);
  }

  private readonly ANGULAR_CUSTOM_SEARCH_CX: string = 'eeecb92da2e7d7571';

  @Get('/angular')
  async searchInAngular(
    @Query('keywords') query: string,
    @Headers('apiKey') apiKey: string,
  ): Promise<CommandResponse> {
    return await this.googleService.searchOrGetConfigForm(
      query,
      this.ANGULAR_CUSTOM_SEARCH_CX,
      apiKey,
    );
  }
}
