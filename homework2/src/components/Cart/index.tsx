import React from 'react';

import { IPizza } from '../../interfaces/iPizza'
import { withData } from '../../components/utils/withDataWrapper'
import { MemoizedPizzaCard } from '../shared/PizzaCard/pizzaCard_smart';

import './cart.css'

/* worrk around for children */
export function Cart({
    removeFromCart,
    cart,
  }: {
    removeFromCart: any;
    cart: IPizza[];
  }) {
    return (
      <aside>
        <h2>
          Cart <small>({cart.length})</small>
        </h2>

        <ul className="container">
          { cart.map(pizza => (
              <MemoizedPizzaCard pizza={pizza} key={pizza.id}>
                <span></span>
                <a className="remove-from-cart" onClick={() => removeFromCart(pizza)}>【 pass 】</a>
              </MemoizedPizzaCard>
          )) }
        </ul>
      </aside>
    );
  }

export const CartWithData = withData(dataSources => ({
    cart: dataSources.cartDataSource.getCart(), 
    removeFromCart: dataSources.cartDataSource.removeFromCart
}))(Cart);