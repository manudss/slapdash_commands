import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TranslateController } from './translate.controller';
import { TranslateService } from './translate.service';

@Module({
  imports: [HttpModule],
  controllers: [TranslateController],
  providers: [TranslateService],
})
export class TranslateModule {}
