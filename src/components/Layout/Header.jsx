import React from 'react';
import classes from './Header.module.css';
import mealsLogo from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onClick} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsLogo} alt="mealsLogo" />
      </div>
    </>
  );
};

export default Header;
