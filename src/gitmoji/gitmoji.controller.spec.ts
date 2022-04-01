import { Test, TestingModule } from '@nestjs/testing';
import { GitmojiController } from './gitmoji.controller';

describe('GitmojiController', () => {
  let controller: GitmojiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GitmojiController],
    }).compile();

    controller = module.get<GitmojiController>(GitmojiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
