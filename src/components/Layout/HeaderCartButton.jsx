import React, { useContext } from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  // const [buttonBump, setButtonBump] = useState(false);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  // useEffect(() => {
  //   if (cartCtx.items.length === 0) {
  //     return;
  //   }

  //   setButtonBump(true);

  //   const bumpTimer = setTimeout(() => {
  //     setButtonBump(false);
  //   }, 300);

  //   return () => {
  //     clearTimeout(bumpTimer);
  //   };
  // }, [cartCtx.items]);

  return (
    /**
     ** If you have a CSS animation class on an element, setting a dynamic 'key={'} will re-render that element and restart any animations or transitions
     **/
    <button key={numberOfCartItems} className={`${classes.button} ${classes.bump}`} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
