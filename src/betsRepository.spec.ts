import { MongoService } from './context/shared/services/mongo.service';
import { MongoClient } from 'mongodb';
import { Test, TestingModule } from '@nestjs/testing';
import { BetsRepository } from './context/bets/infrastructure/betsRepository';
import { DateGenerator } from './context/bets/infrastructure/dateGenerator';
import { CreationDate } from './context/bets/domain/creationDate';
import { BetId } from './context/bets/domain/betId';
import { Bet } from './context/bets/domain/bet';
import { BetNumbers } from './context/bets/domain/betNumbers';
import { v4 as uuidv4 } from 'uuid';

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
    const bet = new Bet(new BetId(uuidv4()),
      new CreationDate(dateGenerator.getDate()),
      previousResults,
      new BetNumbers()
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

  it('be able to save a new bet with betNumbers', async () => {
    const lotteryRepository = new BetsRepository(mongoService);
    const dateGenerator = new DateGenerator();
    const previousResults: string[] = ['12345','64727','79176','94532','22984'];
    const bet = new Bet(new BetId(uuidv4()),
      new CreationDate(dateGenerator.getDate()),
      previousResults,
      new BetNumbers()
    );
    bet.generateBetNumbers();
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

  it('should retrieve a bet by id', async () => {
    const betsRepository = new BetsRepository(mongoService);
    const dateGenerator = new DateGenerator();
    const previousResults: string[] = ['12345','64727','79176','94532','22984'];
    const betId = new BetId(uuidv4());
    const bet = new Bet(
      betId,
      new CreationDate(dateGenerator.getDate()),
      previousResults,
      new BetNumbers()
    );

    await betsRepository.save(bet);

    const retrievedBet = await betsRepository.get(betId.toString());
    expect(retrievedBet).toStrictEqual(bet);
    await mongoService
      .getDatabase()
      .collection('bets')
      .deleteOne({ betId: betId.toString() });
  })

  it('should return all bets info', async ()=>{
    const betsRepository = new BetsRepository(mongoService);
    const dateGenerator = new DateGenerator();
    const previousResults: string[] = ['12345','64727','79176','94532','22984'];
    const betId = new BetId(uuidv4());
    const betId2 = new BetId(uuidv4());
    const betId3 = new BetId(uuidv4());
    const bet1 = new Bet(
      betId,
      new CreationDate(dateGenerator.getDate()),
      previousResults,
      new BetNumbers()
    );
    const bet2 = new Bet(
      betId2,
      new CreationDate(dateGenerator.getDate()),
      previousResults,
      new BetNumbers()
    );
    const bet3 = new Bet(
      betId3,
      new CreationDate(dateGenerator.getDate()),
      previousResults,
      new BetNumbers()
    );
    const expectedBets = [
      {betId: bet1.getBetId(), creationDate: bet1.toPrimitives().creationDate},
      {betId: bet2.getBetId(), creationDate: bet2.toPrimitives().creationDate}, 
      {betId: bet3.getBetId(), creationDate: bet3.toPrimitives().creationDate}
    ];

    await betsRepository.save(bet1);
    await betsRepository.save(bet2);
    await betsRepository.save(bet3);
    const bets = await betsRepository.getAllBetsInfo();

    expect(bets).toHaveLength(3);
    expect(bets).toEqual(expectedBets);
    await mongoService
      .getDatabase()
      .collection('bets')
      .deleteMany({ betId: { $in: [betId.toString(), betId2.toString(), betId3.toString()] } });
  })

  it('should return an empty array if there are no bets', async ()=>{
    const betsRepository = new BetsRepository(mongoService);   

    const bets = await betsRepository.getAllBetsInfo();    
    
    expect(bets).toHaveLength(0);
    expect(bets).toEqual([]);
  })

});
