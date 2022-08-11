import classes from './Cart.module.css';
import {Modal} from "../UI/Modal";
import {useContext} from "react";
import {CartContext} from "../../store/cart-context";
import CartItem from "./CartItem";

export const Cart = props => {
    const cartContext = useContext(CartContext);

    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

    const cartItemAddHandler = item => {
        cartContext.addItem(item);
    };

    const cartItemRemoveHandler = id => {
        cartContext.removeItem(id);
    };

    const cartItems = <ul className={classes['cart-items']}>
        {
            cartContext.items.map(cartItem => <CartItem
                key={cartItem.id}
                name={cartItem.name}
                amount={cartItem.amount}
                price={cartItem.price}
                onAdd={cartItemAddHandler.bind(null, cartItem)}
                onRemove={cartItemRemoveHandler.bind(null, cartItem.id)}
            />)
        }
    </ul>;

    const hasItems = cartContext.items.length > 0;

    return <Modal onClose={props.onClose}>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button}>Order</button>}
        </div>
    </Modal>
};
