import React, { memo } from 'react';

import { IPizza } from '../../../interfaces/iPizza'

interface IProps {
    children: React.ReactNode;
    pizza: IPizza;
}

export function PizzaCard({ children, pizza } : IProps) {
    return(
        <>
        <div className={"col"}>
            {children}
        </div>
        <div className="col post-body">
            <div className="post-title">
                <div>
                    {pizza.name}
                </div>
                <div className="hide-btn">
                    X
                </div>
            </div>
            <div>
                {pizza.description}
            </div>
        </div>
    </>
    );
}