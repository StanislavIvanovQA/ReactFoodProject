import classes from './MealItemForm.module.css'
import {Input} from "../../UI/Input";
import {useRef, useState} from "react";

export const MealItemForm = props => {
    const amountInputRef = useRef();
    const [amountIsValid, setAmountValid] = useState(true);

    const submitHandler = event => {
        event.preventDefault()

        const enteredAmount = +amountInputRef.current.value;

        if (
            amountInputRef.current.value.length === 0
            || enteredAmount < 1
            || enteredAmount > 5
        ) {
            setAmountValid(false);
            return;
        }

        props.onAddToCart(enteredAmount);
    };

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input
            ref={amountInputRef}
            label='Amount'
            input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }
            }/>
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter valid amount (1-5)</p>}
    </form>
};
