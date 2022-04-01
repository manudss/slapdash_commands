export interface Gitmojis {
  emoji: string;
  entity: string;
  code: string;
  description: string;
  name: string;
  semver?: any;
}

export type CopyType = 'emoji' | 'code' | 'description' | 'name' | 'entity';
