import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface CollectionEntity extends InMemoryDBEntity {
  address: string;
  name: string;
  symbol: string;
}
