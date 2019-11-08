import { IPizza, IAction } from '../types'

const PIZZARIA_INVENTORY = require('../../../data').default;

const ACTION_ADD = 'pizza:add';
const ACTION_MOVE_TO_CART = 'pizza:move_to_cart';
const ACTION_ADD_VOTE = 'pizza:add_vote';
const ACTION_REMOVE_VOTE = 'pizza:remove_vote';

export default function pizzas(state: IPizza[] = PIZZARIA_INVENTORY, action: IAction<IPizza>) {
    switch (action.type) {
        case ACTION_ADD: 
            return [...state, action.payload];
        case ACTION_MOVE_TO_CART: 
            return state.filter((p) => p.id !== action.payload.id);
        case ACTION_ADD_VOTE: 
            state.filter((t) => t.id === action.payload.id)[0].votes++;
            return state;
        case ACTION_REMOVE_VOTE: 
            state.filter((t) => t.id === action.payload.id)[0].votes--;
            return state;
        default:
            return state; 
    }
}

export function add(pizza: IPizza): IAction<IPizza> {
    return {
        type: ACTION_ADD,
        payload: pizza
    };
}

export function moveToCart(pizza: IPizza): IAction<IPizza> {
    return {
        type: ACTION_MOVE_TO_CART,
        payload: pizza
    };
}

export function addVote(pizza: IPizza): IAction<IPizza> {
    return {
        type: ACTION_ADD_VOTE,
        payload: pizza
    };
}

export function removeVote(pizza: IPizza): IAction<IPizza> {
    return {
        type: ACTION_REMOVE_VOTE,
        payload: pizza
    };
}
