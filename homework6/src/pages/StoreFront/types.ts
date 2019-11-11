import { IVisible } from "../../modules/votes";
import { IPizza } from "../../modules/pizzas";
import { ICartItem } from "../../modules/cart";

export interface IAction<T> {
    type: string;
    payload: T;
}

export interface IOrderItem {
  id: number;
  count: number;
}


export interface IStore {
    pizzas: IPizza[];
    cart: ICartItem[];
    votes: number[];
    visibilityFilter: {
      name: string;
      filter: (task: IVisible) => boolean;
    };
}