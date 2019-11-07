import React from 'react';

import { IPizza } from '../../../interfaces/iPizza'
import { IProps } from './pizzaCard_smart'

var classNames = require('classnames');

interface IPropsContent extends IProps {
    children: any;
    pizza: IPizza;
    isHidden: boolean;
    changeCardVisibility: any;
}

export function PizzaCardContent({ children, pizza, isHidden, changeCardVisibility } : IPropsContent) {

    return(
        <li className={classNames({
            'row justify-content-start pizza-card': true,
            'fadeOut': isHidden,
            'fadeIn': isHidden
        })}>
            <div className="col-3 container pizza-image">
                <div className="row img-fake-row border-0"></div>
                    {children[0]}
            </div>
            <div className="col-9 pizza-info">
                <div className="row">
                    <div className="col-9">
                    
                    </div>
                    <div className="col-2">
                        {children[1]}
                    </div>
                    <div className="hide-btn" onClick={() => changeCardVisibility()}>
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