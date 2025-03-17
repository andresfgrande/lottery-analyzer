import {  Injectable } from "@nestjs/common";
import { BetsRepository } from "../infrastructure/betsRepository";


export interface GetAllBetsInfoResponse {
    bets: BetInfo[];
}

export interface BetInfo{
    betId: string;
    creationDate: string;
}

@Injectable()
export class GetAllBetsInfoService {
    constructor(private betsRepository: BetsRepository) {}

    async execute():Promise<GetAllBetsInfoResponse> {
        const bets = await this.betsRepository.getAllBetsInfo();
        return { bets };
    }
}