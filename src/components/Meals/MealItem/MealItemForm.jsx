import React, { useContext, useState } from 'react';

import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import CartContext from '../../../store/cart-context';

const MealItemForm = ({ id, name, description, price }) => {
  const [amount, setAmount] = useState(1);
  const [amountIsValid, setAmountIsValid] = useState(true);
  const cartCtx = useContext(CartContext);

  const submitHandler = (e) => {
    e.preventDefault();

    if (amount < 1 || amount > 5) {
      setAmountIsValid(false);
    }

    cartCtx.addItem({
      id: id,
      name: name,
      price: price,
      amount: amount,
    });
  };

  const amountHandler = (e) => {
    setAmount(+e.target.value);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        input={{
          id: 'amount_' + id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          onChange: amountHandler,
          value: amount,
        }}
      />
      <button type="submit">Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1 - 5)</p>}
    </form>
  );
};

export default MealItemForm;
