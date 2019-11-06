import React, { memo } from 'react';

import { IPizza } from '../../interfaces/iPizza'
import { withData } from '../../components/utils/withDataWrapper'
import { PizzaCard } from '../PizzasList/PizzaCard';

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
              <PizzaCard pizza={pizza} key={pizza.id}>
                <span></span>
                <a className="remove-from-cart" onClick={() => removeFromCart(pizza)}>【 pass 】</a>
              </PizzaCard>
          )) }
        </ul>
      </aside>
    );
  }

export const CartWithData = withData(dataSources => ({
    cart: dataSources.cartDataSource.getCart(), 
    removeFromCart: dataSources.cartDataSource.removeFromCart
}))(Cart);