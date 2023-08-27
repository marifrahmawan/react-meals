import React, { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckOut, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      'https://react-httprequest-c9392-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userData,
          orderedItems: {
            ...cartCtx.items,
            totalItems: cartCtx.items.reduce((acc, curr) => acc + curr.amount, 0),
            totalAmount: cartCtx.totalAmount,
          },
        }),
      }
    );

    const jsonData = await response.json();

    console.log(jsonData);

    setIsSubmitting(false);
    setDidSubmit(true);

    cartCtx.clearCart();
  };

  const ModalContent = (
    <>
      <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              name={item.name}
              price={item.price}
              amount={item.amount}
              onAdd={cartCtx.addItem.bind(null, { ...item, amount: 1 })}
              onRemove={cartCtx.removeItem.bind(null, item.id)}
            />
          );
        })}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartCtx.totalAmount.toFixed(2)}</span>
      </div>

      {isCheckOut && <Checkout onCancel={props.onClick} onSubmit={submitOrderHandler} />}

      {!isCheckOut && (
        <div className={classes.actions}>
          <button className={classes['button--alt ']} onClick={props.onClick}>
            Close
          </button>
          {cartCtx.items.length > 0 && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  return (
    <Modal onClick={props.onClick}>
      {isSubmitting && <p>Submitting Orders, Please Wait . . .</p>}
      {didSubmit && !isSubmitting && (
        <>
          <p>Successfully sent the order!</p>
          <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClick}>
              Close
            </button>
          </div>
        </>
      )}
      {!isSubmitting && !didSubmit && ModalContent}
    </Modal>
  );
};

export default Cart;
