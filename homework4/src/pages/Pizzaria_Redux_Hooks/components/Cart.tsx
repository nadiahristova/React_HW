import React from 'react';

import './cart.css'

import { IStore, IPizza } from '../types';
import { useSelector, connect } from 'react-redux';

import { add } from '../modules/pizzas';
import { returnToInventory } from '../modules/cart';

import PizzaCart from './PizzaCard'
import ManagePizzaButton from './ManagePizzaButton';

interface IProps {
    dispatch: any;
}

function Cart({ dispatch } : IProps) {

    const pizzas = useSelector(filterPizzasInCart);

    const onReturnToInventory = (pizza: IPizza) => {
        dispatch(returnToInventory(pizza));
        dispatch(add(pizza));
    }

    return (
       <>
            <h2>
            Cart <small>({pizzas.length})</small>
            </h2>

            <ul className="container">
            { pizzas.map(pizza => (
                    <PizzaCart pizza={pizza} key={pizza.id}>
                        <div></div>
                        <ManagePizzaButton text={"【 pass 】"} className={"remove-from-cart"} entity={pizza} onChange={() => onReturnToInventory(pizza)}/>
                    </PizzaCart>
            ))}
            </ul>
      </>
    )
}

function filterPizzasInCart(state: IStore) {
    return state.cart.filter(state.visibilityFilter.filter);
}

  
const decorate = connect();

export default decorate(Cart);