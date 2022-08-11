import classes from './MealItem.module.css';
import {MealItemForm} from "./MealItemForm";
import {useContext} from "react";
import {CartContext} from "../../../store/cart-context";

export const MealItem = props => {
    const cartContext = useContext(CartContext);
    const price = `$${props.price.toFixed(2)}`;
    const addToCartHandler = amount => {
        const item = {
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        };

        cartContext.addItem(item);
    };

    return <li className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealItemForm onAddToCart={addToCartHandler}/>
        </div>
    </li>
};