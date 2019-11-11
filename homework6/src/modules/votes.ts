import { IAction } from '../pages/StoreFront/types'

//#region [ Types ]

export interface IVisible { 
    isVisible: boolean;
  }
//endregion

//#region [ Constants ]
const ACTION_TOGGLE_VOTE = 'pizza:toggle_vote';
//endregion

//#region [ Reducers ]
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
//endregion

//#region [ Actions ]
export function toggleVote(pizzaId: number): IAction<number> {
    return {
        type: ACTION_TOGGLE_VOTE,
        payload: pizzaId
    };
}
//#endregion