import { CommandResponse } from '@slapdash/command-response-types';
import { CopyType } from './gimojis.model';
import { GitmojiService } from './gitmoji.service';
export declare class GitmojiController {
    private gitmojiService;
    constructor(gitmojiService: GitmojiService);
    getGitmoji(copyType: CopyType, selected: string): CommandResponse;
}
