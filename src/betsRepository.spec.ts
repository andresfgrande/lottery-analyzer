import { MongoService } from './context/shared/services/mongo.service';
import { MongoClient } from 'mongodb';
import { Test, TestingModule } from '@nestjs/testing';
import { BetsRepository } from './context/bets/infrastructure/betsRepository';
import { Bet } from './context/bets/domain/bet';

describe('LotteryService should', () => {
  let mongoService: MongoService;
  let mongoClient: MongoClient;

  beforeAll(async () => {
    mongoClient = new MongoClient('mongodb://root:example@localhost:27017/');
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MongoService,
        {
          provide: MongoClient,
          useValue: mongoClient,
        },
      ],
    }).compile();

    mongoService = module.get<MongoService>(MongoService);
  });

  afterAll(async () => {
    await mongoClient.close();
  });

  it('be able to save a new element', async () => {
    const lotteryRepository = new BetsRepository(mongoService);
    const bet: Bet = {
      idBet: 'test1',
      number: 12345,
    };

    await lotteryRepository.save(bet);

    const savedBet = await mongoService
      .getDatabase()
      .collection('bets')
      .findOne({ idBet: bet.idBet });

    expect(savedBet).toMatchObject(bet);
    await mongoService
      .getDatabase()
      .collection('bets')
      .deleteOne({ idBet: bet.idBet });
  });
});
