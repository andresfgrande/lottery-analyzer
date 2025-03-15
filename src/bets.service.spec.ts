import { CreateBetService } from './context/bets/services/createBet.service';
import { mock } from 'jest-mock-extended';
import { BetsRepository } from './context/bets/infrastructure/betsRepository';
import { DateGenerator } from './context/bets/infrastructure/dateGenerator';
import { CreationDate } from './context/bets/domain/creationDate';
import { BetId } from './context/bets/domain/betId';
import { Bet } from './context/bets/domain/bet';
import { v4 as uuidv4 } from 'uuid';
import { BetNumberPrimitives } from './context/bets/domain/betNumber';
import { BetNumbers } from './context/bets/domain/betNumbers';

export interface CreateBetRequestDto {
  previousResults: string[];
  generateBet: boolean;
}
export interface CreateBetRequest {
  previousResults: string[];
  generateBet: boolean;
}

export interface GetBetRequestDto {
  betId: string;
}

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('BetsService', () => {
  const betsRepository = mock<BetsRepository>();
  const dateGenerator = mock<DateGenerator>();
  const betsService = new CreateBetService(betsRepository, dateGenerator);
  const mockUuidv4 = jest.requireMock('uuid').v4;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should save a new bet without generated bet numbers', async () => {
    const expectedDate = new Date().toISOString();
    dateGenerator.getDate.mockReturnValue(expectedDate);
    const mockedUuid = uuidv4();
    mockUuidv4.mockReturnValueOnce(mockedUuid);
    const previousResults = ['12345', '64727', '79176', '94532', '22984'];
    const createBetRequest: CreateBetRequest = {
      previousResults: previousResults,
      generateBet: false,
    };
    const bet = new Bet(
      new BetId(uuidv4()),
      new CreationDate(dateGenerator.getDate()),
      previousResults,
      new BetNumbers(),
    );

    await betsService.execute(createBetRequest);

    expect(betsRepository.save).toHaveBeenCalledWith(bet);
  });

  it('should save a new bet with generated bet numbers', async () => {
    const expectedDate = new Date().toISOString();
    dateGenerator.getDate.mockReturnValue(expectedDate);
    const mockedUuid = uuidv4();
    mockUuidv4.mockReturnValueOnce(mockedUuid);
    const previousResults = ['12345', '64727', '79176', '94532', '22984'];
    const createBetRequest: CreateBetRequest = {
      previousResults: previousResults,
      generateBet: true,
    };
    const excludedPairs = new Set(["12", "64", "79", "94", "22"]);
    const betNumbers: BetNumberPrimitives[] = Array.from({ length: 100 }, (_, i) => {
      const firstPair = i.toString().padStart(2, "0");
      return excludedPairs.has(firstPair)
        ? null
        : { firstPair, middle: "", lastPair: "" };
    }).filter(Boolean) as BetNumberPrimitives[];
    const bet = new Bet(
      new BetId(uuidv4()),
      new CreationDate(dateGenerator.getDate()),
      previousResults,
      BetNumbers.fromPrimitives(betNumbers),
    );

    await betsService.execute(createBetRequest);

    expect(betsRepository.save).toHaveBeenCalledWith(bet);

  })
});
