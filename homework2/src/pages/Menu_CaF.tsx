//#region [ rgba(231, 155, 255, 0.1) ] << Imports >>
import React from 'react';
import { PizzasList } from '../components/PizzasList/index_CaF'
import { CartWithData } from '../components/Cart'
//#endregion


export default function Page(){
    return(
        <div className="store-front-page">
            <PizzasList/>
            <CartWithData/>
        </div>
    );
}
