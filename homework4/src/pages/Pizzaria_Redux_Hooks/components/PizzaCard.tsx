import React, { useState } from 'react';

import { IPizza } from '../types'
//import { combineReducers } from '../index'

var classNames = require('classnames');

export interface IProps {
    children: any;
    pizza: IPizza;
}

function PizzaCard({ children, pizza } : IProps) {
    const [state, setState] = useState({ isVisible: true });

    const hideCard = () => {
        pizza.isVisible = false;
        setState({...state, isVisible: !state.isVisible});
    }

    return (
        <li className={classNames({
            'row justify-content-start pizza-card': true,
            'fadeOut': !state.isVisible,
            'fadeIn': state.isVisible
        })}>
            <div className="col-3 container pizza-image">
                {children[0] && (
                    <>
                        <div className="row img-fake-row border-0"></div>
                        {children[0]}
                    </>
                    )
                }
            </div>
            <div className="col-9 pizza-info">
                <div className="row">
                    <div className="col-9">
                    
                    </div>
                    <div className="col-2">
                        {children[1]}
                    </div>
                    <div className="hide-btn" onClick={() => hideCard()}>
                        ❌
                    </div>
                </div>
                <div className="pizza-title row">
                    {pizza.name}
                </div>
                <div className="row pizza-description">
                    {pizza.description}
                </div>
                <div className="row pizza-ingrediants">
                    { pizza.ingredients && `Ingredients: ${pizza.ingredients!.join(', ') || ''}` }
                </div>
            </div>
        </li>
    );
}

export default PizzaCard;