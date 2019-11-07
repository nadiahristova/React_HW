//#region [ rgba(231, 155, 255, 0.1) ] << Imports >>
import React from 'react';
import { PizzasListWithData } from '../components/PizzasList'
import { Cart } from '../components/Cart/index_Caf'
//#endregion

export default function Page(){
    return(
        <div className="store-front-page">
            <PizzasListWithData/>
            <Cart/>
        </div>
    );
}

