import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';

@Injectable()
export class MongoService implements OnModuleInit, OnModuleDestroy {
  constructor(private client: MongoClient) {}

  async onModuleDestroy(): Promise<void> {
    await this.client.close();
  }

  async onModuleInit(): Promise<void> {
    await this.client.connect();
  }

  getDatabase(): Db {
    return this.client.db('lottery');
  }
}
