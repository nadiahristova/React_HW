import React from 'react';

import { MemoizedPizzaCard } from '../shared/PizzaCard/pizzaCard_smart'
import { WithData } from '../../components/utils/WithData'

import './pizza-list.css'
import { IDataSourceList } from '../../interfaces/IDataSourceList';

var classNames = require('classnames');

export function PizzasList() {

    return (
        <section>
            <h2>~ Menu ~</h2>
            <h4>CaF</h4>
            <WithData selectData={getPizzariaData}>
                {({ pizzas, addToCart, vote, myVotes }) => 
                    pizzas.length === 0 ? (
                        <strong>All pizzas have been bought</strong>
                    ) : (
                        <ul className="container">
                            {pizzas.map(pizza => (
                                <MemoizedPizzaCard pizza={pizza} key={pizza.id}>
                                    <button className={classNames({
                                                                    'row w-100 vote-btn': true,
                                                                    'fade-out': myVotes.has(pizza.id)
                                                                })} 
                                        onClick={() => vote(pizza.id)}>
                                            <div className="hor-center w-100">
                                                <span>Vote</span> 
                                                <span className={classNames({
                                                    'vote-arrow': true,
                                                    'hidden': myVotes.has(pizza.id)
                                                })}> ▲</span>
                                                <span className={classNames({
                                                    'vote-arrow': true,
                                                    'hidden': !myVotes.has(pizza.id)
                                                })}> ▼</span>
                                            </div>
                                        <span className="votes-count hor-center w-100">{pizza.votes}</span>  
                                    </button>
                                    <a className="add-to-card-btn" onClick={() => addToCart(pizza)}>add to cart</a>
                                </MemoizedPizzaCard>
                            ))}
                        </ul>
                    )
                }
            </WithData>
        </section>
    );
}

const getPizzariaData = (dataSources: IDataSourceList) => ({
    pizzas: dataSources.storeDataSource.getAllPizzas(), 
    addToCart: dataSources.cartDataSource.addToCart,
    vote: dataSources.voteDataSource.vote,
    //hasVoted: dataSources.voteDataSource.vote,
    myVotes: dataSources.voteDataSource.getMyVotes()
});