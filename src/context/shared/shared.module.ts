import { Module } from '@nestjs/common';
import { MongoService } from './services/mongo.service';
import { MongoClient } from 'mongodb';
import configuration from '../../config/configurations';

const mongoClient = {
  provide: MongoClient,
  useFactory: async () => {
    return new MongoClient(configuration().database.uri);
  },
};

@Module({
  providers: [mongoClient, MongoService],
  exports: [MongoService],
})
export class SharedModule {}
