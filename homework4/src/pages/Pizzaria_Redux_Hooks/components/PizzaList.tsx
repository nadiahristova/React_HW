import React from 'react';
import { IStore } from '../types';
import { useSelector, connect, useDispatch } from 'react-redux';

import PizzaCart from './PizzaCard'
import { IPizza } from '../types';
import VoteButton from './VoteButton';
import ManagePizzaButton from './ManagePizzaButton';

import { moveToCart, addVote, removeVote } from '../modules/pizzas';
import { addToCart } from '../modules/cart';
import { toggleVote } from '../modules/votes';

import './pizza-list.css'

function PizzaList() {
    const dispatch = useDispatch();

    const pizzas = useSelector(filterPizzas);
    const myVotes = useSelector(getMyVotes);

    const hadVoted = (pizza: IPizza) => myVotes.some((pizzaId) => pizzaId === pizza.id);

    const onToggleVote = (hadVoted: boolean, pizza: IPizza) => {
        dispatch(toggleVote(pizza.id));

        if(hadVoted) {
            dispatch(removeVote(pizza));
        } else {
            dispatch(addVote(pizza));
        }
    }

    const onMoveToCat = (pizza: IPizza) => {
        dispatch(moveToCart(pizza));
        dispatch(addToCart(pizza));
    }
    
    return (
        <>
            {pizzas.length === 0 ? (
                <strong>All pizzas have been bought</strong>
            ) : (
                <ul className="container">
                    {pizzas.map(pizza => (
                        <PizzaCart key={pizza.id} pizza={pizza}>
                            <VoteButton votesCount={pizza.votes} hadVoted={hadVoted(pizza)} onChange={() => onToggleVote(hadVoted(pizza), pizza)}/>
                            <ManagePizzaButton text={"add to cart"} className={"add-to-card-btn"} entity={pizza} onChange={() => onMoveToCat(pizza)}/>
                        </PizzaCart>
                    ))}
                </ul>
            )}
        </>
    );
}

function filterPizzas(state: IStore) {
    return state.pizzas.filter(state.visibilityFilter.filter);
}

function getMyVotes(state: IStore) {
    return state.votes;
}
  
const decorate = connect();

export default decorate(PizzaList);