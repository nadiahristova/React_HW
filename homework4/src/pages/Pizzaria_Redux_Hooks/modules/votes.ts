import { IAction } from '../types'

const ACTION_TOGGLE_VOTE = 'pizza:toggle_vote';

export default function votes(state: number[] = [], action: IAction<number>) {
    switch (action.type) {
        case ACTION_TOGGLE_VOTE:
            if(state.some((pizzaId) => pizzaId === action.payload)) {
                return state.filter((pizzaId) => pizzaId !== action.payload)
            } else {
                return [...state, action.payload];
            }
        default:
            return state; 
    }
}

export function toggleVote(pizzaId: number): IAction<number> {
    return {
        type: ACTION_TOGGLE_VOTE,
        payload: pizzaId
    };
}
