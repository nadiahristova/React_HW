import {IDataSource, DataSourceClass} from './basicDataSource'
import StoreDataSourceClass, { IStoreDataSource } from './storeDataSource'

export interface IVoteDataSource extends IDataSource {
    vote(id: number): boolean;
    hasVoted(id: number): boolean;
    getMyVotes(): Set<number>;
}

const userId: number = 1;

export class VoteDataSourceClass extends DataSourceClass implements IVoteDataSource {
  _myVotes: Set<number> = new Set<number>();

  constructor(private _storeDataSource: IStoreDataSource) {
    super();
  } 

  vote = (id : number) => {

    let hasAlreadyVoted: boolean = this.hasVoted(id);

    if(hasAlreadyVoted){
      this._myVotes.delete(id);
      this._storeDataSource.getPizza(id)!.votes--;
    } else {
      this._myVotes.add(id);
      this._storeDataSource.getPizza(id)!.votes++;
    }

    hasAlreadyVoted = !hasAlreadyVoted;

    this.emit();

    return hasAlreadyVoted;
  }

  hasVoted = (id : number) => {
    return this._myVotes.has(id);
  }

  getMyVotes = () => {
    return this._myVotes;
  }
}

export default new VoteDataSourceClass(StoreDataSourceClass);