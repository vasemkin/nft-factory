import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { TokensService } from 'src/tokens/tokens.service';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';

@Module({
  imports: [
    InMemoryDBModule.forFeature('collections', {}),
    InMemoryDBModule.forFeature('tokens', {}),
  ],
  controllers: [CollectionsController],
  providers: [CollectionsService, TokensService],
})
export class CollectionsModule {}
