import React, { memo, useState } from 'react';

import { IPizza } from '../../interfaces/iPizza'
import { PizzaCard } from './PizzaCard'
import { withData } from '../../components/utils/withDataWrapper'

import './pizza-list.css'
import votesDataSource from '../../utils/dataSources/votesDataSource';

var classNames = require('classnames');

function PizzasList({
    addToCart,
    pizzas,
    vote,
    hasVoted, 
    myVotes
}: {
    addToCart: any;
    pizzas: IPizza[];
    vote: any;
    hasVoted: any;
    myVotes: Set<number>;
}) {

    /* how to use hasVoted in the same element???*/
    /* do we need li element here???*/

    return (
        <section>
            <h2>~ Menu ~</h2>
            {pizzas.length === 0 ? (
                <strong>All pizzas have been bought</strong>
            ) : (
                <ul className="container">
                    {pizzas.map(pizza => (
                        <PizzaCard pizza={pizza} key={pizza.id}>
                            <button className={classNames({
                                                            'row w-100 vote-btn': true,
                                                            'fade-out': myVotes.has(pizza.id)
                                                        })} 
                                onClick={() => vote(pizza.id)}>
                                    <div className="hor-center w-100">
                                        <span>Vote</span> 
                                        <span className={classNames({
                                            'vote-arrow': true,
                                            'd-lg-none d-sm-none d-md-none': myVotes.has(pizza.id)
                                        })}> ▲</span>
                                        <span className={classNames({
                                            'vote-arrow': true,
                                            'd-lg-none d-sm-none d-md-none': !myVotes.has(pizza.id)
                                        })}> ▼</span>
                                    </div>
                                <span className="votes-count hor-center w-100">{pizza.votes}</span>  
                            </button>
                            <a className="add-to-card-btn" onClick={() => addToCart(pizza)}>add to cart</a>
                        </PizzaCard>
                    ))}
                </ul>
            )}
        </section>
    );
}

export const PizzasListWithData = withData(dataSources => ({
    pizzas: dataSources.storeDataSource.getAllPizzas(), 
    addToCart: dataSources.cartDataSource.addToCart,
    vote: dataSources.voteDataSource.vote,
    hasVoted: dataSources.voteDataSource.vote,
    myVotes: dataSources.voteDataSource.getMyVotes()
}))(PizzasList);