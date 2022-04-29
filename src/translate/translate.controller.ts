import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  Query,
} from '@nestjs/common';
import { CommandResponse } from '@slapdash/command-response-types';
import { TranslateBody } from './translate.model';
import { TranslateService } from './translate.service';

@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @Get('/')
  async getForms(
    @Query('keywords') query: string,
    @Headers('apiKey') apiKey: string,
    @Headers('displayResult') displayResult: string,
  ): Promise<CommandResponse> {
    return await this.translateService.getFormOrGetConfigForm(
      query,
      apiKey,
      displayResult,
    );
  }

  @Post('/')
  @HttpCode(200)
  async translate(
    @Body() body: TranslateBody,
    @Headers('apiKey') apiKey: string,
    @Headers('displayResult') displayResult: string,
  ): Promise<CommandResponse> {
    return await this.translateService.translate(body, apiKey, displayResult);
  }
}
