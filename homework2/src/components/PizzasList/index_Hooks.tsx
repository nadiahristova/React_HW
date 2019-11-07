import React, { useState, useEffect, useCallback } from 'react';

import { MemoizedPizzaCard } from '../shared/PizzaCard/pizzaCard_smart'
import { useData } from '../utils/useData'

import './pizza-list.css'
import { IDataSourceList } from '../../interfaces/IDataSourceList';

var classNames = require('classnames');

export function PizzasList() {
    const { pizzas, addToCart, vote, myVotes } = useData(getPizzariaData);
    return (
        <section>
            <h2>~ Menu ~</h2>
            <h4>Hooks</h4>
            {pizzas.length === 0 ? (
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
            )}
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