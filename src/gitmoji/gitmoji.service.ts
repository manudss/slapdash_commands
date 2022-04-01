import { Injectable } from '@nestjs/common';
import {
  Action,
  ActionPaste,
  CommandResponse,
  Config,
  List,
  ListOption,
} from '@slapdash/command-response-types';
import { CopyType, Gitmojis } from './gimojis.model';

import * as GIT_EMOJIS from './gitmojis.json';

@Injectable()
export class GitmojiService {
  getListOfEmojis(): Gitmojis[] {
    return GIT_EMOJIS.gitmojis;
  }

  mapToCommandResponse(
    gitmojis: Gitmojis[],
    copyType: CopyType,
  ): CommandResponse {
    return {
      view: {
        type: 'list',
        options: gitmojis.map((gitmoji) => {
          return {
            title: `${gitmoji.code} ${gitmoji.description}`,
            subtitle: `${gitmoji.name} | ${gitmoji.entity} | ${gitmoji.semver}`,
            icon: gitmoji.emoji,
            action: this.getAction(gitmoji, copyType),
            moveAction: {
              type: 'add-param',
              name: 'selected',
              value: gitmoji.name,
            },
            group: gitmoji.semver ?? 'Other',
          };
        }),
      },
    };
  }

  public getConfigForm(): { config: Config } {
    return {
      config: {
        form: {
          fields: [
            {
              type: 'select',
              defaultValue: 'emoji',
              options: [
                { value: 'emoji', label: 'Emoji character' },
                { value: 'code', label: 'Emoji Code' },
                { value: 'entity', label: 'Html Entity' },
                { value: 'name', label: 'name' },
                { value: 'description', label: 'description' },
              ],
              id: 'copy-type',
              label: 'What type of copy to use?',
            },
          ],
        },
      },
    };
  }

  private getAction(gitmoji: Gitmojis, copyType: CopyType): ActionPaste {
    return {
      type: 'paste',
      value: gitmoji[copyType],
    };
  }

  getGitmojiCommands(selected: string): {
    view: List;
  } {
    const gitmoji = this.getListOfEmojis().find(
      (gitmoji) => gitmoji.name === selected,
    );
    console.log('getGitmojiCommands', selected, gitmoji);
    return {
      view: {
        type: 'list',
        options: this.getOptionsForGitmojiCommands(gitmoji),
      },
    };
  }

  private getOptionsForGitmojiCommands(gitmoji: Gitmojis): ListOption[] {
    const listesOptions: ListOption[] = [
      {
        title: `Copy/Paste emoji`,
        subtitle: `${gitmoji.emoji}`,
        icon: gitmoji.emoji,
        action: {
          type: 'paste',
          value: gitmoji.emoji,
        },
      },
      {
        title: `Copy/Paste code`,
        subtitle: `${gitmoji.code}`,
        icon: gitmoji.emoji,
        action: {
          type: 'paste',
          value: gitmoji.code,
        },
      },
      {
        title: `Copy/Paste HTML entity`,
        subtitle: `${gitmoji.entity}`,
        icon: gitmoji.emoji,
        action: {
          type: 'paste',
          value: gitmoji.entity,
        },
      },
      {
        title: `Copy/Paste name`,
        subtitle: `${gitmoji.name}`,
        icon: gitmoji.emoji,
        action: {
          type: 'paste',
          value: gitmoji.name,
        },
      },
      {
        title: `Copy/Paste description`,
        subtitle: `${gitmoji.description}`,
        icon: gitmoji.emoji,
        action: {
          type: 'paste',
          value: gitmoji.description,
        },
      },
    ];
    if (gitmoji.semver) {
      listesOptions.push({
        title: `Copy/Paste semver`,
        subtitle: `${gitmoji.semver}`,
        icon: gitmoji.emoji,
        action: {
          type: 'paste',
          value: gitmoji.semver,
        },
      });
    }
    return listesOptions;
  }
}
