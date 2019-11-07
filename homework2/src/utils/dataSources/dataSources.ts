import { IDataSourceList } from "../../interfaces/IDataSourceList";

import StoreDataSource from './storeDataSource';
import CartDataSource from './cartDataSource';
import VotesDataSource from './votesDataSource';

export const DataSources: IDataSourceList = {
    storeDataSource: StoreDataSource,
    cartDataSource: CartDataSource,
    voteDataSource: VotesDataSource
}