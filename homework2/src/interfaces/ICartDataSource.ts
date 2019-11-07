import { IDataSource } from '../interfaces/IDataSource'
import { IPizza } from '../interfaces/iPizza'

export interface ICartDataSource extends IDataSource {
    addToCart(pizza: IPizza): void;
    removeFromCart(pizza: IPizza): void;
    getCart(): IPizza[];
}