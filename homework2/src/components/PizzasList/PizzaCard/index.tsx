import React, { memo, useState } from 'react';

import { IPizza } from '../../../interfaces/iPizza'
var classNames = require('classnames');

interface IProps {
    children: any;
    pizza: IPizza;
}

export function PizzaCard({ children, pizza } : IProps) {
    const [state, setState] = useState({ isHidden: false });

    const changeCardVisibility = () => {
        setState({...state, isHidden: !state.isHidden});
    }

    return (<PizzaCardContent pizza={pizza} children={children} isHidden={state.isHidden} changeCardVisibility={changeCardVisibility} />);
}

interface IPropsContent extends IProps {
    children: any;
    pizza: IPizza;
    isHidden: boolean;
    changeCardVisibility: any;
}

export function PizzaCardContent({ children, pizza, isHidden, changeCardVisibility } : IPropsContent) {

    return(
        <li key={pizza.id} className={classNames({
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