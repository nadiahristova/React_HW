import React from 'react';

import './cart.css'

import { IStore } from '../types';
import { useSelector, connect } from 'react-redux';

import { add } from '../modules/pizzas';
import { returnToInventory } from '../modules/cart';

import PizzaCart from './PizzaCard'
import ManagePizzaButton from './GenericButton';

interface IProps {
    dispatch: any;
}

function Cart({ dispatch } : IProps) {

    //const pizzas = useSelector(filterPizzasInCart);
    const cartItems = useSelector(filterCartItems);
    const cartItemsCount = useSelector(getCartCount);
    const bill = useSelector(getBill);

    const onReturnToInventory = (pizzaId: number) => {
        dispatch(returnToInventory(pizzaId));
        dispatch(add(pizzaId));
    }

    const hideCard = (state: any, setState: any, entityId: number) => {
        cartItems.find(ci => ci.pizzaId === entityId)!.isVisible = false;
        setState({...state, isVisible: !state.isVisible});
    }

    return (
       <>
            <h2>
                Cart 
            </h2>

            <ul className="container">
                { cartItems && cartItems.map(pizza => (
                        <PizzaCart pizzaId={pizza.pizzaId} key={pizza.pizzaId} hideCard={hideCard}>
                            <div></div>
                            <ManagePizzaButton text={"【 pass 】"} className={"remove-from-cart"} entityId={pizza.pizzaId} onChange={() => onReturnToInventory(pizza.pizzaId)}/>
                            <span className="badge"> x {pizza.count}</span>
                        </PizzaCart>
                ))}
            </ul>

            <h5 className="font-weight-bold">
                { cartItemsCount > 0 && 
                    <>
                        Total: <span className="price">$ {bill}</span>  
                        <span className="price"> ({cartItemsCount} { cartItemsCount == 1 ? "pizza" : "pizzas" }</span>)
                    </>    
                }
            </h5>
      </>
    )
}

function filterCartItems(state: IStore) {
    return state.cart.filter(state.visibilityFilter.filter);
}

function getBill(state: IStore) {
    let bill = 0;

    state.cart.forEach(ci => {
        let pizza = state.pizzas.find(p => p.id === ci.pizzaId);

        bill += !!pizza ? pizza.price * ci.count : 0;
    })

    return bill;
}

function getCartCount(state: IStore) {
    return state.cart.reduce((sum, ci) => sum + ci.count, 0)
}


  
const decorate = connect();

export default decorate(Cart);