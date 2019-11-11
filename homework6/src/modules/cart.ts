import { IAction, IStore, IOrderItem } from '../pages/StoreFront/types'
import { IVisible } from './votes';

//#region [ Types ]  

export interface ICartItem extends IVisible, IOrderItem {
}

//#endregion

//#region [ Constants ]
const ACTION_ADD = 'cart:add';
const ACTION_RETURN_TO_INVENTORY = 'cart:return';
//#endregion

//#region [ Reducers ]
export default function pizzas(state: ICartItem[] = [], action: IAction<number>): ICartItem[] {
    let existingCartItem: ICartItem | undefined;

    switch (action.type) {
        case ACTION_ADD: 
            existingCartItem = state.find(ci => ci.id === action.payload);
            
            if(existingCartItem) {
                existingCartItem.count++;

                return state;
            }

            return [...state, { id: action.payload, count: 1, isVisible: true }];
        case ACTION_RETURN_TO_INVENTORY: 
            existingCartItem = state.find(ci => ci.id === action.payload);

            if(existingCartItem) {
                existingCartItem.count--;

                if(existingCartItem.count === 0) {
                    return state.filter(ci => ci.id !== action.payload);
                }

                return state;
            }

            return state;
        default:
            return state; 
    }
}
//#endregion

//#region [ Actions ]
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
//#endregion

//#region [ Selectors ]
export function filterCartItems(state: IStore) {
    return state.cart.filter(state.visibilityFilter.filter);
}

export function getBill(state: IStore) {
    let bill = 0;

    state.cart.forEach(ci => {
        let pizza = state.pizzas.find(p => p.id === ci.id);

        bill += !!pizza ? pizza.price * ci.count : 0;
    })

    return bill;
}

export function getCartCount(state: IStore) {
    return state.cart.reduce((sum, ci) => sum + ci.count, 0)
}

export function getCartItems(state: IStore) {
    return state.cart.map(ci => ({ id: ci.id, count: ci.count }));
}
//#endregion