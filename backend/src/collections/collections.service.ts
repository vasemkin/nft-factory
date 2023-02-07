import {
  InjectInMemoryDBService,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { CollectionEntity } from '../entities/collection.entity';
import type { NFTFactory } from '../typechain';

import * as localDepoyment from '../deployments/localhost/NFTFactory.json';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class CollectionsService {
  wss =
    process.env?.IS_TESTNET === 'TRUE'
      ? process.env.TESTNET_WSS
      : process.env.LOCALHOST_WSS;

  initializeConnection = false;

  constructor(
    @InjectInMemoryDBService('collections')
    private dbService: InMemoryDBService<CollectionEntity>,
    private tokensService: TokensService,
  ) {}

  async listen() {
    const provider = new ethers.providers.WebSocketProvider(this.wss);

    const contract = new ethers.Contract(
      localDepoyment.address,
      localDepoyment.abi,
      provider,
    ) as NFTFactory;

    setInterval(() => {
      contract.removeAllListeners('CollectionCreated');
      contract.on('CollectionCreated', (from, to, value, event) => {
        const collecionPayload = {
          name: event?.args?.name || '',
          symbol: event?.args?.symbol || '',
          address: event?.args?.collection || '',
        };

        this.dbService.create(collecionPayload);

        this.tokensService.listen(collecionPayload.address);
      });
    }, 6000);
  }
}
