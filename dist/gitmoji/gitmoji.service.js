"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitmojiService = void 0;
const common_1 = require("@nestjs/common");
const GIT_EMOJIS = require("./gitmojis.json");
let GitmojiService = class GitmojiService {
    getListOfEmojis() {
        return GIT_EMOJIS.gitmojis;
    }
    mapToCommandResponse(gitmojis, copyType) {
        return {
            view: {
                type: 'list',
                options: gitmojis.map((gitmoji) => {
                    var _a;
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
                        group: (_a = gitmoji.semver) !== null && _a !== void 0 ? _a : 'Other',
                    };
                }),
            },
        };
    }
    getConfigForm() {
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
    getAction(gitmoji, copyType) {
        return {
            type: 'paste',
            value: gitmoji[copyType],
        };
    }
    getGitmojiCommands(selected) {
        const gitmoji = this.getListOfEmojis().find((gitmoji) => gitmoji.name === selected);
        console.log('getGitmojiCommands', selected, gitmoji);
        return {
            view: {
                type: 'list',
                options: this.getOptionsForGitmojiCommands(gitmoji),
            },
        };
    }
    getOptionsForGitmojiCommands(gitmoji) {
        const listesOptions = [
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
};
GitmojiService = __decorate([
    (0, common_1.Injectable)()
], GitmojiService);
exports.GitmojiService = GitmojiService;
//# sourceMappingURL=gitmoji.service.js.map