import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoService } from './context/shared/services/mongoService';
import { LotteryRepository } from './context/shared/infrastructure/lotteryRepository';
import { MongoClient } from 'mongodb';

const mongoClient = {
  provide: MongoClient,
  useFactory: async () => {
    return new MongoClient('mongodb://localhost:27017/lottery');
  },
};
@Module({
  imports: [],
  controllers: [AppController],
  providers: [mongoClient, MongoService, LotteryRepository, AppService],
})
export class AppModule {}
