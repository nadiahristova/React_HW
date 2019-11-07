import { IDataSource } from './IDataSource'

export interface IVoteDataSource extends IDataSource {
    vote(id: number): boolean;
    hasVoted(id: number): boolean;
    getMyVotes(): Set<number>;
}