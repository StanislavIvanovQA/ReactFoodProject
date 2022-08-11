import {Fragment} from 'react';
import mealImage from '../../assets/meals.jpeg'
import classes from './Header.module.css'
import {HeaderCartButton} from "./HeaderCartButton";

export const Header = props => {
    return <Fragment>
        <header className={classes.header}>
            <h1>React Meals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealImage} alt='Table full of food'/>
        </div>
    </Fragment>
};