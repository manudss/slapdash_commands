import { Controller, Get, Headers, Query } from '@nestjs/common';
import { CommandResponse, Config } from '@slapdash/command-response-types';
import { CopyType } from './gimojis.model';
import { GitmojiService } from './gitmoji.service';

@Controller('gitmoji')
export class GitmojiController {
  constructor(private gitmojiService: GitmojiService) {}

  @Get('/')
  getGitmoji(
    @Headers('copy-type') copyType: CopyType,
    @Query('selected') selected: string,
  ): CommandResponse {
    if (copyType) {
      if (selected) {
        return this.gitmojiService.getGitmojiCommands(selected);
      }
      return this.gitmojiService.mapToCommandResponse(
        this.gitmojiService.getListOfEmojis(),
        copyType,
      );
    }
    return this.gitmojiService.getConfigForm();
  }
}

function getEmojiCommands(selected: string) {
  throw new Error('Function not implemented.');
}
