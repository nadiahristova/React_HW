//#region [ rgba(231, 155, 255, 0.1) ] << Imports >>
import React from 'react';
import { PizzasList } from '../components/PizzasList/index_Hooks'
import { Cart } from '../components/Cart/index_Hooks'
//#endregion

export default function Page(){
    return(
        <div className="store-front-page">
            <PizzasList/>
            <Cart/>
        </div>
    );
}

