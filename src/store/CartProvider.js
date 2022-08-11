import {CartContext} from "./cart-context";
import {useReducer} from "react";

const defaultCartState = {items: [], totalAmount: 0};

const cartReducer = (state, action) => {

    if (action.type === 'ADD') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = +(state.totalAmount + action.item.price * action.item.amount);

        let updatedItems;
        if (existingCartItem) {
            const newArr = [...state.items];
            newArr[existingCartItemIndex].amount += action.item.amount;
            updatedItems = newArr;
        } else {
            updatedItems = state.items.concat(action.item)
        }

        return {items: updatedItems, totalAmount: updatedTotalAmount};
    }

    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount -= existingCartItem.price;

        let updatedItems;
        if (existingCartItem) {
            if(existingCartItem.amount === 1){
                updatedItems = state.items.filter(item => item.id !== existingCartItem.id);
            } else {
                const newArr = [...state.items];
                newArr[existingCartItemIndex].amount -= 1;
                updatedItems = newArr;
            }
        }
        return {items: updatedItems, totalAmount: updatedTotalAmount};
    }

    return defaultCartState;
};

export const CartProvider = props => {
    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = item => {
        dispatchCart({type: 'ADD', item: item});
    };

    const removeItemToCartHandler = id => {
        dispatchCart({type: 'REMOVE', id: id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};
