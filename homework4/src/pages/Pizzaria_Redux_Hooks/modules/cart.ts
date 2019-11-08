import { IPizza, IAction } from '../types'

const ACTION_ADD = 'cart:add';
const ACTION_RETURN_TO_INVENTORY = 'cart:return';

export default function pizzas(state: IPizza[] = [], action: IAction<IPizza>) {
    switch (action.type) {
        case ACTION_ADD: 
            return [...state, action.payload];
        case ACTION_RETURN_TO_INVENTORY: 
            return state.filter((p) => p.id !== action.payload.id);
        default:
            return state; 
    }
}

export function addToCart(pizza: IPizza): IAction<IPizza> {
    return {
        type: ACTION_ADD,
        payload: pizza
    };
}

export function returnToInventory(pizza: IPizza): IAction<IPizza> {
    return {
        type: ACTION_RETURN_TO_INVENTORY,
        payload: pizza
    };
}
