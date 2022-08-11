import {CartIcon} from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import {useContext, useEffect, useState} from "react";
import {CartContext} from "../../store/cart-context";

export const HeaderCartButton = props => {
    const [buttonHighlighted, setButtonHighlighted] = useState(false);

    const cartContext = useContext(CartContext);
    const {items} = cartContext;

    const numberOfCartItems = items.reduce(((previousValue, mealType) => previousValue + mealType.amount), 0);

    const buttonClasses = `${classes.button} ${buttonHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) return;
        setButtonHighlighted(true);
        const timer = setTimeout(() => {
            setButtonHighlighted(false)
        }, 300)

        return () => clearTimeout(timer);
    }, [items]);

    return <button className={buttonClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
};
