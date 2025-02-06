import { Module } from '@nestjs/common';
import { MongoService } from './services/mongo.service';
import { MongoClient } from 'mongodb';

const mongoClient = {
  provide: MongoClient,
  useFactory: async () => {
    return new MongoClient('mongodb://localhost:27017/');
  },
};

@Module({
  providers: [mongoClient, MongoService],
  exports: [MongoService],
})
export class SharedModule {}
