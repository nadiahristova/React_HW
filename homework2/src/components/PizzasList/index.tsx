import React, { memo } from 'react';

import { IPizza } from '../../interfaces/iPizza'
import { PizzaCard } from './PizzaCard'
import { withData } from '../../components/utils/withDataWrapper'

function PizzasList({
    addToCart,
    pizzas
}: {
    addToCart: any;
    pizzas: IPizza[];
}) {
    return (
        <main>
            <h2>Menu</h2>
            {pizzas.length === 0 ? (
                <strong>All pizzas have been bought</strong>
            ) : (
                <ul>
                    {pizzas.map(pizza => (
                        <li key={pizza.id}>
                            <PizzaCard pizza={pizza}>
                                <button onClick={() => addToCart(pizza)}>+</button>
                            </PizzaCard>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}

export const PizzasListWithData = withData(dataSources => ({
    pizzas: dataSources.storeDatasource.getAllPizzas(), 
    addToCart: dataSources.storeDatasource.addToCart
}))(PizzasList);