import { combineReducers } from 'redux'

import pizzas from './pizzas'
import cart from './cart'
import votes from './votes'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
    pizzas,
    cart,
    votes,
    visibilityFilter
  });
  