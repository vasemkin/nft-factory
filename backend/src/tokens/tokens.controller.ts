import {
  InjectInMemoryDBService,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TokenEntity } from '../entities/token.entity';

@Controller('tokens')
export class TokensController {
  constructor(
    @InjectInMemoryDBService('tokens')
    private dbService: InMemoryDBService<TokenEntity>,
  ) {}

  @Get()
  getTokens() {
    return this.dbService.getAll();
  }

  @Post()
  addToken(@Body() token: TokenEntity) {
    return this.dbService.create(token);
  }

  @Delete(':id')
  deleteToken(@Param('id') id: string) {
    return this.dbService.delete(id);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.dbService.query((data) => data.id === id);
  }

  @Get('by-collection/:id')
  getByCollection(@Param('id') address: string) {
    return this.dbService.query((data) => data.collection === address);
  }
}
