import { IPizza, ICartItem, IAction } from '../types'

const ACTION_ADD = 'cart:add';
const ACTION_RETURN_TO_INVENTORY = 'cart:return';


export default function pizzas(state: ICartItem[] = [], action: IAction<number>) {
    let existingCartItem: ICartItem | undefined;

    switch (action.type) {
        case ACTION_ADD: 
            existingCartItem = state.find(ci => ci.pizzaId === action.payload);
            
            if(existingCartItem) {
                existingCartItem.count++;

                return state;
            }

            return [...state, { pizzaId: action.payload, count: 1, isVisible: true }];
        case ACTION_RETURN_TO_INVENTORY: 
            existingCartItem = state.find(ci => ci.pizzaId === action.payload);

            if(existingCartItem) {
                existingCartItem.count--;

                if(existingCartItem.count === 0) {
                    return state.filter(ci => ci.pizzaId !== action.payload);
                }

                return state;
            }

            return state;
        default:
            return state; 
    }
}

export function addToCart(pizzaId: number): IAction<number> {
    return {
        type: ACTION_ADD,
        payload: pizzaId
    };
}

export function returnToInventory(pizzaId: number): IAction<number> {
    return {
        type: ACTION_RETURN_TO_INVENTORY,
        payload: pizzaId
    };
}
