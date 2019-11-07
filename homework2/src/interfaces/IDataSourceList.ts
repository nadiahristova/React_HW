import { IStoreDataSource } from './IStoreDataSource';
import { ICartDataSource } from './ICartDataSource';
import { IVoteDataSource } from './IVoteDataSource';

export interface IDataSourceList {
    storeDataSource: IStoreDataSource;
    cartDataSource: ICartDataSource;
    voteDataSource: IVoteDataSource;
}