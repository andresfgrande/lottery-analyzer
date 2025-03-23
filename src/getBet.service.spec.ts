import { mock } from 'jest-mock-extended';
import { BetsRepository } from './context/bets/infrastructure/betsRepository';
import { GetBetRequest, GetBetService } from './context/bets/services/getBet.service';
import { Bet, BetPrimitives } from './context/bets/domain/bet';
import { NotFoundException } from '@nestjs/common';

describe('GetBetService', () => {
  const betsRepository = mock<BetsRepository>();
  const getBetService = new GetBetService(betsRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve a bet by id', async () => {
    const getBetRequest: GetBetRequest = {
      betId: '05901778-62c2-4dee-91a2-28765214e075',
    };
    const betPrimitives: BetPrimitives = {
      betId: '05901778-62c2-4dee-91a2-28765214e075',
      betNumbers: {
        betNumberPairs: [],
      },
      creationDate: '2025-03-16T09:05:26.671Z',
      previousResults: ['12345', '64727', '79176', '94532', '22984'],
      stats: {
        statsCollection: [],
      },
    };
    const expectedRetrievedBet = Bet.fromPrimitives(betPrimitives);
    betsRepository.get.mockResolvedValue(expectedRetrievedBet);

    const betResponse = await getBetService.execute(getBetRequest);

    expect(betResponse).toStrictEqual(expectedRetrievedBet.toPrimitives());
  });

  it('should throw an exception if bet is not found', async () => {
    const getBetRequest: GetBetRequest = {
      betId: '05901778-62c2-4dee-91a2-28765214e075',
    };

    betsRepository.get.mockResolvedValue(undefined);

    await expect(getBetService.execute(getBetRequest)).rejects.toThrow(NotFoundException);
  });
});
