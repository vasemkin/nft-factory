import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { CollectionsModule } from './collections/collections.module';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    InMemoryDBModule.forRoot({}),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    CollectionsModule,
    TokensModule,
  ],
})
export class AppModule {}
