import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './modules';
import PizzaList from './components/PizzaList';
import Cart from './components/Cart';
import Filters from './components/Filters';


const store = createStore(reducers);

export default function Page() {
    return (
        <Provider store={store}>
            <div className="app">
                <section>
                    <h2>~ Menu ~</h2>
                    <Filters/>
                    <PizzaList/>
                </section>
                <aside>
                    <Cart/>
                </aside>
            </div>
        </Provider>
    );
}