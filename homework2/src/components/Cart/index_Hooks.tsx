import React from 'react';

import { IPizza } from '../../interfaces/iPizza'
import { withData } from '../../components/utils/withDataWrapper'
import { MemoizedPizzaCard } from '../shared/PizzaCard/pizzaCard_smart';

import './cart.css'
import { IDataSourceList } from '../../interfaces/IDataSourceList';
import { WithData } from '../utils/WithData';
import { useData } from '../../components/utils/useData'

export function Cart() {
    
    const { cart, removeFromCart } = useData(getCartData);

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
    )
}

export const getCartData = (data: IDataSourceList) => ({
    cart: data.cartDataSource.getCart(), 
    removeFromCart: data.cartDataSource.removeFromCart
});