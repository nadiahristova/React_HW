import { IPizza, IAction } from '../types'

const PIZZARIA_INVENTORY = require('../../../data').default;

const ACTION_ADD = 'pizza:add';
const ACTION_MOVE_TO_CART = 'pizza:move_to_cart';
const ACTION_UP_VOTE = 'pizza:up_vote';
const ACTION_DOWN_VOTE = 'pizza:down_vote';

export default function pizzas(state: IPizza[] = PIZZARIA_INVENTORY, action: IAction<number | IPizza>) {
    switch (action.type) {
        case ACTION_ADD: 

            const paramAsPizza = (action.payload as IPizza);
            const pizzaID = !!paramAsPizza.id ? paramAsPizza.id : action.payload;
            let addedPizza = state.find(pizza => pizza.id === pizzaID); 

            if(addedPizza) {
                return state.map(pizza => 
                    pizza.id === action.payload 
                        ? { 
                            ...pizza,
                            count: pizza.count + 1
                          }
                        : pizza)
            }

            return !!paramAsPizza ? [...state, paramAsPizza] : state;
        case ACTION_MOVE_TO_CART:

            let movedPizza = state.find(pizza => pizza.id === action.payload); 
            if(movedPizza && movedPizza.count > 0) {
                return state.map(pizza => 
                    pizza.id === action.payload 
                        ? { 
                            ...pizza,
                            count: pizza.count - 1
                          }
                        : pizza)
            }
            return state;
        case ACTION_UP_VOTE: 
            let upVotedPizza = state.find((t) => t.id === action.payload);

            if(upVotedPizza) {
                upVotedPizza.votes++;
            }

            return state;
        case ACTION_DOWN_VOTE: 
            let downVotedPizza = state.find((t) => t.id === action.payload);

            if(downVotedPizza) {
                downVotedPizza.votes--;
            }

            return state;
        default:
            return state; 
    }
}

export function add(pizza: IPizza | number): IAction<IPizza | number> {
    return {
        type: ACTION_ADD,
        payload: pizza
    };
}

export function moveToCart(pizza: number): IAction<number> {
    return {
        type: ACTION_MOVE_TO_CART,
        payload: pizza
    };
}

export function addVote(pizza: number): IAction<number> {
    return {
        type: ACTION_UP_VOTE,
        payload: pizza
    };
}

export function removeVote(pizza: number): IAction<number> {
    return {
        type: ACTION_DOWN_VOTE,
        payload: pizza
    };
}
