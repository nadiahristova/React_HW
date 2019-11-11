import React from 'react';
import { useSelector, connect } from 'react-redux';

import './cart.css'
import { add } from '../../../modules/pizzas';
import { returnToInventory, filterCartItems, getCartCount, getBill } from '../../../modules/cart';

import PizzaCart from './PizzaCard'
import GenericButton from './GenericButton';

interface IProps {
    dispatch: any;
}

function Cart({ dispatch } : IProps) {

    const cartItems = useSelector(filterCartItems);
    const cartItemsCount = useSelector(getCartCount);
    const bill = useSelector(getBill);

    const onReturnToInventory = (pizzaId: number) => {
        dispatch(returnToInventory(pizzaId));
        dispatch(add(pizzaId));
    }

    const hideCard = (state: any, setState: any, entityId: number) => {
        cartItems.find(ci => ci.id === entityId)!.isVisible = false;
        setState({...state, isVisible: !state.isVisible});
    }

    return (
       <>
            <h2>
                Cart 
            </h2>

            <ul className="container">
                { cartItems && cartItems.map(pizza => (
                        <PizzaCart pizzaId={pizza.id} key={pizza.id} hideCard={hideCard}>
                            <div></div>
                            <GenericButton text={"【 pass 】"} className={"remove-from-cart"} entityId={pizza.id} onChange={() => onReturnToInventory(pizza.id)}/>
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
  
const decorate = connect();

export default decorate(Cart);