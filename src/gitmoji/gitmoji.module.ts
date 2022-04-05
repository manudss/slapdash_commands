import { Module } from '@nestjs/common';
import { GitmojiController } from './gitmoji.controller';
import { GitmojiService } from './gitmoji.service';

@Module({
  controllers: [GitmojiController],
  providers: [GitmojiService],
})
export class GitmojiModule {}
