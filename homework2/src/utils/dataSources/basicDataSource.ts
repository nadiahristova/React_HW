import EventEmitter from 'eventemitter3';

import { IDataSource } from '../../interfaces/IDataSource'
  
export class DataSourceClass implements IDataSource {
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

export default new DataSourceClass();