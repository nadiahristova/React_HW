//#region [ rgba(231, 155, 255, 0.1) ] << Imports >>
import React from 'react';
import { IPizza } from '../interfaces/iPizza'
import { PizzasListWithData } from '../components/PizzasList'
import { CartWithData } from '../components/Cart'
//#endregion


//#region [ rgba(0, 205, 30, 0.1) ] << Interfaces >>
interface IProps {

}

interface IState {
    pizzas: IPizza[]
} 
//#endregion


export default function Page(){
    return(
        <div className="store-front-page">
            <PizzasListWithData/>
            <CartWithData/>
        </div>
    );
}

