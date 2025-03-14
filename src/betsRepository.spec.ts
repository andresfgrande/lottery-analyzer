import { MongoService } from './context/shared/services/mongo.service';
import { MongoClient } from 'mongodb';
import { Test, TestingModule } from '@nestjs/testing';
import { BetsRepository } from './context/bets/infrastructure/betsRepository';
import { DateGenerator } from './context/bets/infrastructure/dateGenerator';
import { CreationDate } from './context/bets/domain/creationDate';
import { BetId } from './context/bets/domain/betId';
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

  it('be able to save a new bet without betNumbers', async () => {
    const lotteryRepository = new BetsRepository(mongoService);
    const dateGenerator = new DateGenerator();
    const previousResults: string[] = ['12345','64727','79176','94532','22984'];
    const betNumbers: string[] = [];
    const bet = new Bet(new BetId('id1'),
      new CreationDate(dateGenerator.getDate()),
      previousResults,
      betNumbers
    );
    const expectedSavedBet = bet.toPrimitives();

    await lotteryRepository.save(bet);

    const savedBet = await mongoService
      .getDatabase()
      .collection('bets')
      .findOne({ betId:  bet.getBetId()});
    expect(savedBet).toMatchObject(expectedSavedBet);
    await mongoService
      .getDatabase()
      .collection('bets')
      .deleteOne({ betId: bet.getBetId() });
  });

  //REMOVE

  //UPDATE

  //RETRIEVE
});
