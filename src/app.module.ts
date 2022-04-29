import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GitmojiModule } from './gitmoji/gitmoji.module';
import { GoogleModule } from './google/google.module';
import { TranslateModule } from './translate/translate.module';

@Module({
  imports: [GitmojiModule, GoogleModule, TranslateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
