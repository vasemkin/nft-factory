import {
  InjectInMemoryDBService,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

import type { NFTFactory } from '../typechain';
import { TokenEntity } from '../entities/token.entity';
import * as collectionABI from '../artifacts/contracts/Collection.sol/Collection.json';

@Injectable()
export class TokensService {
  wss =
    process.env?.IS_TESTNET === 'TRUE'
      ? process.env.TESTNET_WSS
      : process.env.LOCALHOST_WSS;

  constructor(
    @InjectInMemoryDBService('tokens')
    private dbService: InMemoryDBService<TokenEntity>,
  ) {}

  async listen(address: string) {
    const provider = new ethers.providers.WebSocketProvider(this.wss);

    const contract = new ethers.Contract(
      address,
      collectionABI.abi,
      provider,
    ) as NFTFactory;

    setInterval(() => {
      contract.removeAllListeners('TokenMinted');
      contract.on('TokenMinted', (collection, recepient, tokenId, tokenUri) => {
        const tokenPayload = {
          collection,
          recepient,
          tokenId,
          tokenUri,
        };

        this.dbService.create(tokenPayload);
      });
    }, 6000);
  }
}
