import { mock } from "jest-mock-extended";
import { BetsRepository } from "./context/bets/infrastructure/betsRepository";
import { GetBetService } from "./context/bets/services/getBet.service";
import { DeleteBetService } from "./context/bets/services/deleteBet.service";
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from "@nestjs/common";

describe('DeleteBetService', () => {
     const betsRepository = mock<BetsRepository>();
      const deleteBetService = new DeleteBetService(betsRepository);
    
      beforeEach(() => {
        jest.clearAllMocks();
      });

    it('should delete a bet by id', async () => {
        const deleteRequest = {
            betId: uuidv4()
        };

        await deleteBetService.execute(deleteRequest);

        expect(betsRepository.deleteBet).toHaveBeenCalledWith(deleteRequest.betId);
    });

    it('should throw an exception if bet is not found', async () => {
        const deleteRequest = {
            betId: uuidv4()
        };

        betsRepository.deleteBet.mockResolvedValue(undefined);

        await expect(deleteBetService.execute(deleteRequest)).rejects.toThrow(NotFoundException);
    });
});