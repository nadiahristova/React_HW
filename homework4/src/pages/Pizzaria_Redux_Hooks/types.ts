export interface IAction<T> {
    type: string;
    payload: T;
}

export interface IPizza {
    id: number;
    name: string;
    description: string;
    ingredients: string[];
    price: number;
    count: number;
    votes: number;
    isVisible: boolean;
}

export interface IStore {
    pizzas: IPizza[];
    cart: IPizza[];
    votes: number[];
    visibilityFilter: {
      name: string;
      filter: (task: IPizza) => boolean;
    };
  }