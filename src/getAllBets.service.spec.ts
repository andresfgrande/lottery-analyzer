import { mock } from "jest-mock-extended";
import { BetsRepository } from "./context/bets/infrastructure/betsRepository";
import { BetInfo, GetAllBetsInfoService } from "./context/bets/services/getAllBetsInfo.service";

describe(GetAllBetsInfoService, () => {

    const betsRepository = mock<BetsRepository>();
    const getAllBetsService = new GetAllBetsInfoService(betsRepository);
    
    it('should return all bets info', async () => {
        const bet1: BetInfo = { betId: '05901778-62c2-4dee-91a2-28765214e075', creationDate: '2021-09-01T00:00:00.000Z' };
        const bet2: BetInfo = { betId: '05901778-62c2-4dee-91a2-28765214e076', creationDate: '2021-09-01T00:00:00.000Z' };
        const bet3: BetInfo = { betId: '05901778-62c2-4dee-91a2-28765214e077', creationDate: '2021-09-01T00:00:00.000Z' };
        const expectedBets = [bet1, bet2, bet3];
        betsRepository.getAllBetsInfo.mockResolvedValue(expectedBets);

        const bets = await getAllBetsService.execute();

        expect(bets).toEqual({bets: expectedBets});
    });

    it('should return an empty array if there are no bets', async () => {
        betsRepository.getAllBetsInfo.mockResolvedValue([]);

        const bets = await getAllBetsService.execute();

        expect(bets).toEqual({bets: []});
    });
});