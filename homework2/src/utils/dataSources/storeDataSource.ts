import { IPizza } from '../../interfaces/iPizza'
import { IDataSource, DataSourceClass } from './basicDataSource'
  
export interface IStoreDataSource extends IDataSource {
  getPizza(id: number): IPizza | undefined;
  removePizza(id: number): boolean;
  addPizza(pizza: IPizza): void;
  getAllPizzas(): IPizza[];
}

export class StoreDataSourceClass extends DataSourceClass implements IStoreDataSource {
  _pizzas: IPizza[] = [];

  constructor(pizzas: IPizza[]) {
    super();
    this._pizzas = pizzas;
  }

  getPizza = (id: number) => {
    return this._pizzas.find(pizza => pizza.id === id);
  };

  removePizza = (id: number) => {
    let pizzaExists = this._pizzas.some(p => p.id === id);

    if(pizzaExists) {
      this._pizzas = this._pizzas.filter(p => p.id !== id);
      
      this.emit();
    }

    return pizzaExists;
  }

  addPizza = (pizza: IPizza) => {

    this._pizzas = [...this._pizzas, pizza];
    
    this.emit();
  }

  getAllPizzas = () => {
    return this._pizzas;
  };
}

const inventory = require('../../data');
export default new StoreDataSourceClass(inventory.default);