import { IPizza } from '../../interfaces/iPizza'
import { DataSourceClass } from './basicDataSource'
import StoreDataSourceClass from './storeDataSource'
import { ICartDataSource } from '../../interfaces/ICartDataSource'
import { IStoreDataSource } from '../../interfaces/IStoreDataSource'


export class CartDataSourceClass extends DataSourceClass implements ICartDataSource {
  _cart: IPizza[] = [];

  constructor(private _storeDataSource: IStoreDataSource) {
    super();
  }

  addToCart = (pizza: IPizza) => {
      this._cart = [...this._cart, pizza];
      this._storeDataSource.removePizza(pizza.id);

      this.emit();
  };

  removeFromCart = (pizza: IPizza) => {
    this._cart = this._cart.filter(p => p !== pizza);
    this._storeDataSource.addPizza(pizza);

    this.emit();
  };

  getCart = () => {
    return this._cart;
  };
}

export default new CartDataSourceClass(StoreDataSourceClass);