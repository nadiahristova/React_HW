export interface IAction<T> {
    type: string;
    payload: T;
}

export interface IVisible { 
    isVisible: boolean;
}

export interface IPizza extends IVisible {
    id: number;
    name: string;
    description: string;
    ingredients: string[];
    price: number;
    count: number;
    votes: number;
    imageURL: string;
}

export interface ICartItem extends IVisible {
    pizzaId: number;
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