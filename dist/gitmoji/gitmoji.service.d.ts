import { CommandResponse, Config, List } from '@slapdash/command-response-types';
import { CopyType, Gitmojis } from './gimojis.model';
export declare class GitmojiService {
    getListOfEmojis(): Gitmojis[];
    mapToCommandResponse(gitmojis: Gitmojis[], copyType: CopyType): CommandResponse;
    getConfigForm(): {
        config: Config;
    };
    private getAction;
    getGitmojiCommands(selected: string): {
        view: List;
    };
    private getOptionsForGitmojiCommands;
}
