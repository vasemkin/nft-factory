import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface TokenEntity extends InMemoryDBEntity {
  collection: string;
  recepient: string;
  tokenId: number;
  tokenUri: string;
}
