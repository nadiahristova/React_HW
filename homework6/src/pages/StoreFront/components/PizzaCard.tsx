import React, { useState } from 'react';

import { useSelector, connect } from 'react-redux';
import { IStore } from '../types';

var classNames = require('classnames');

export interface IProps {
    children: any;
    pizzaId: number;
    hideCard(state: any, setstate:any, entityId: number): void;
}

function PizzaCard({ children, pizzaId, hideCard } : IProps) {
    const [state, setState] = useState({ isVisible: true });

    const pizza = useSelector(getAllPizzas).find((pizza) => pizza.id === pizzaId);
 
    return (
        (pizza || <></>) && <li className={classNames({
            'row justify-content-start pizza-card': true,
            'fadeOut': !state.isVisible,
            'fadeIn': state.isVisible
        })}>
            <div className="col-3 container pizza-image" style={{ backgroundImage: "url('" + pizza!.imageURL + "')" }}>
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
                    <div className="hide-btn" onClick={() => hideCard(state, setState, pizza!.id)}>
                        ❌
                    </div>
                </div>
                <div className="pizza-title row">
                    <span>
                        <span>{pizza!.name}</span>
                        {children[2]}
                    </span>
                    <span className="pizza-price price">$ {pizza!.price}</span>
                </div>
                <div className="row pizza-description">
                    {pizza!.description}
                </div>
                <div className="row pizza-ingrediants">
                    { pizza!.ingredients && `Ingredients: ${pizza!.ingredients!.join(', ') || ''}` }
                </div>
            </div>
        </li>
    );
}

function getAllPizzas(state: IStore) {
    return state.pizzas;
}

const decorate = connect();

export default decorate(PizzaCard);