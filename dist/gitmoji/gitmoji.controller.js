"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitmojiController = void 0;
const common_1 = require("@nestjs/common");
const gitmoji_service_1 = require("./gitmoji.service");
let GitmojiController = class GitmojiController {
    constructor(gitmojiService) {
        this.gitmojiService = gitmojiService;
    }
    getGitmoji(copyType, selected) {
        console.log('getGitmoji : copyType / selected', copyType, selected);
        if (copyType) {
            if (selected) {
                return this.gitmojiService.getGitmojiCommands(selected);
            }
            return this.gitmojiService.mapToCommandResponse(this.gitmojiService.getListOfEmojis(), copyType);
        }
        return this.gitmojiService.getConfigForm();
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Headers)('copy-type')),
    __param(1, (0, common_1.Query)('selected')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Object)
], GitmojiController.prototype, "getGitmoji", null);
GitmojiController = __decorate([
    (0, common_1.Controller)('gitmoji'),
    __metadata("design:paramtypes", [gitmoji_service_1.GitmojiService])
], GitmojiController);
exports.GitmojiController = GitmojiController;
function getEmojiCommands(selected) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=gitmoji.controller.js.map