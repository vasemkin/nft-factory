import {
  InjectInMemoryDBService,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CollectionEntity } from '../entities/collection.entity';
import { CollectionsService } from './collections.service';

@Controller('collections')
export class CollectionsController {
  constructor(
    private readonly collectionsService: CollectionsService,
    @InjectInMemoryDBService('collections')
    private dbService: InMemoryDBService<CollectionEntity>,
  ) {
    this.collectionsService.listen();
  }

  @Get()
  getCollections() {
    return this.dbService.getAll();
  }

  @Post()
  addCollection(@Body() collection: CollectionEntity) {
    return this.dbService.create(collection);
  }

  @Delete(':id')
  deleteCollection(@Param('id') id: string) {
    return this.dbService.delete(id);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.dbService.query((data) => data.id === id);
  }

  @Get('address/:id')
  getByAddress(@Param('id') address: string) {
    return this.dbService.query((data) => data.address === address);
  }
}
