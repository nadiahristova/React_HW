import React, { useState } from 'react';

import { IPizza } from '../../../interfaces/iPizza'
import { PizzaCardContent } from './pizzaCard_content'

export interface IProps {
    children: any;
    pizza: IPizza;
}

function PizzaCard({ children, pizza } : IProps) {
    const [state, setState] = useState({ isHidden: false });

    const changeCardVisibility = () => {
        setState({...state, isHidden: !state.isHidden});
    }

    return (<PizzaCardContent pizza={pizza} children={children} isHidden={state.isHidden} changeCardVisibility={changeCardVisibility} />);
}

export const MemoizedPizzaCard = React.memo(PizzaCard);