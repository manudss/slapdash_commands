export interface Gitmojis {
  emoji: string;
  entity: string;
  code: string;
  description: string;
  name: string;
  semver?: 'major' | 'minor' | 'patch' | null | string;
}

export type CopyType = 'emoji' | 'code' | 'description' | 'name' | 'entity';
