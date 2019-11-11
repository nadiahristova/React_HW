import React from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';

import PizzaCart from './PizzaCard'
import VoteButton from './VoteButton';
import GenericButton from './GenericButton';

import { IPizza, moveToCart, addVote, removeVote, filterPizzas, getMyVotes } from '../../../modules/pizzas';
import { addToCart } from '../../../modules/cart';
import { toggleVote } from '../../../modules/votes';

import './pizza-list.css'

function PizzaList() {
    const dispatch = useDispatch();

    const pizzas = useSelector(filterPizzas);
    const myVotes = useSelector(getMyVotes);

    const hadVoted = (pizza: IPizza) => myVotes.some((pizzaId) => pizzaId === pizza.id);

    const onToggleVote = (hadVoted: boolean, pizzaId: number) => {
        dispatch(toggleVote(pizzaId));

        if(hadVoted) {
            dispatch(removeVote(pizzaId));
        } else {
            dispatch(addVote(pizzaId));
        }
    }

    const hideCard = (state: any, setState: any, entityId: number) => {
        pizzas.find(p => p.id === entityId)!.isVisible = false;
        setState({...state, isVisible: !state.isVisible});
    }

    const onMoveToCart = (pizza: IPizza) => {
        if(pizza.count > 0) {
            dispatch(moveToCart(pizza.id));
            dispatch(addToCart(pizza.id));
        }
    }
    
    return (
        <>
            {pizzas.length === 0 ? (
                <h5 className=''>All available pizzas are hidden</h5>
            ) : (
                <ul className="container">
                    {pizzas.map(pizza => (
                        <PizzaCart key={pizza.id} pizzaId={pizza.id} hideCard={hideCard}>
                            <VoteButton votesCount={pizza.votes} hadVoted={hadVoted(pizza)} onChange={() => onToggleVote(hadVoted(pizza), pizza.id)}/>
                            <GenericButton text={"add to cart"} className={"add-to-card-btn"} entityId={pizza.id} onChange={() => onMoveToCart(pizza)}/>
                            <span className="badge">x {pizza.count}</span>
                        </PizzaCart>
                    ))}
                </ul>
            )}
        </>
    );
}

  
const decorate = connect();

export default decorate(PizzaList);