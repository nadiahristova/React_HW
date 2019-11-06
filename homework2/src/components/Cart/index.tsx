import React, { memo } from 'react';

import { IPizza } from '../../interfaces/iPizza'
import { withData } from '../../components/utils/withDataWrapper'
import { PizzaCard } from '../PizzasList/PizzaCard';

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
        <ul>
          {cart.map(pizza => (
            <li key={pizza.id}>
              <PizzaCard pizza={pizza}>
                <button onClick={() => removeFromCart(pizza)}>-</button>
              </PizzaCard>
            </li>
          ))}
        </ul>
      </aside>
    );
  }

export const CartWithData = withData(dataSources => ({
    cart: dataSources.storeDatasource.getCart(), 
    removeFromCart: dataSources.storeDatasource.removeFromCart
}))(Cart);