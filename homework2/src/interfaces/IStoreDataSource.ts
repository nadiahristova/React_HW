import { IDataSource } from '../interfaces/IDataSource'
import { IPizza } from '../interfaces/iPizza'
  
export interface IStoreDataSource extends IDataSource {
    getPizza(id: number): IPizza | undefined;
    removePizza(id: number): boolean;
    addPizza(pizza: IPizza): void;
    getAllPizzas(): IPizza[];
  }