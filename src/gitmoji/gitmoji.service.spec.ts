import { Test, TestingModule } from '@nestjs/testing';
import { GitmojiService } from './gitmoji.service';

describe('GitmojiService', () => {
  let service: GitmojiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GitmojiService],
    }).compile();

    service = module.get<GitmojiService>(GitmojiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
