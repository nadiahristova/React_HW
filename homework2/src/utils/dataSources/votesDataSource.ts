import EventEmitter from 'eventemitter3';

import { IPizza } from '../../interfaces/iPizza'

import {IDataSource, DataSourceClass} from './basicDataSource'

/* export interface IDataSource {
    addChangeListener(fn: any): any;
    removeChangeListener(fn: any): void;
  }
  
  class DataSourceClass implements IDataSource {
    _emitter = new EventEmitter();
  
    // event emitters
    emit() {
      this._emitter.emit('change');
    }
  
    addChangeListener(fn: any) {
      this._emitter.on('change', fn);
  
      return () => this.removeChangeListener(fn);
    }
  
    removeChangeListener(fn: any) {
      this._emitter.off('change', fn);
    }
  }
  
  export interface IStoreDataSource extends IDataSource {
    getPizza(id: number): IPizza | undefined;
    getAllPizzas(): IPizza[];
    addToCart(pizza: IPizza): void;
    removeFromCart(pizza: IPizza): void;
    getCart(): IPizza[];
  }
 */
export interface IVoteDataSource extends IDataSource {
    vote(id:number): boolean;
}

export class VoteDataSourceClass extends DataSourceClass implements IVoteDataSource {
  _myVotes: Set<number> = new Set<number>();

  vote(id :number) {

    let hasAlreadyVoted : boolean = this._myVotes.has(id);

    if(!hasAlreadyVoted){
        this._myVotes.add(id);
    }

    alert(hasAlreadyVoted);

    return hasAlreadyVoted;
  }
}

export default new VoteDataSourceClass();