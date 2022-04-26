import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GitmojiModule } from './gitmoji/gitmoji.module';
import { GoogleModule } from './google/google.module';

@Module({
  imports: [GitmojiModule, GoogleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
