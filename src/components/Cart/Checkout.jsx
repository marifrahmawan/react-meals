import React from 'react';
import classes from './Checkout.module.css';
import useInput from '../../hooks/use-input';

const Checkout = (props) => {
  const {
    value: nameValue,
    hasError: nameHasError,
    inputChangeHandler: nameChangeHandler,
    onBlurValue: onBlurName,
    reset: resetName,
  } = useInput((nameValue) => nameValue.trim().length > 5);

  const {
    value: streetValue,
    hasError: streetHasError,
    inputChangeHandler: streetChangeHandler,
    onBlurValue: onBlurStreet,
    reset: resetStreet,
  } = useInput((streetValue) => streetValue.trim().length > 5);

  const {
    value: postalValue,
    hasError: postalHasError,
    inputChangeHandler: postalChangeHandler,
    onBlurValue: onBlurPostal,
    reset: resetPostal,
  } = useInput((postalValue) => postalValue.trim().length > 2);

  const {
    value: cityValue,
    hasError: cityHasError,
    inputChangeHandler: cityChangeHandler,
    onBlurValue: onBlurCity,
    reset: resetCity,
  } = useInput((cityValue) => cityValue.trim().length > 2);

  const submitCheckout = (e) => {
    e.preventDefault();

    if (nameHasError && postalHasError && cityHasError && streetHasError) {
      return;
    }

    props.onSubmit({
      id: Math.random(),
      name: nameValue,
      street: streetValue,
      city: cityValue,
      postalCode: postalValue,
    });

    resetName();
    resetStreet();
    resetPostal();
    resetCity();
  };

  return (
    <form className={classes.form} onSubmit={submitCheckout}>
      <div className={`${classes.control} ${nameHasError ? classes.invalid : ''}`}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={onBlurName}
        />
        {nameHasError && <p style={{ color: '#aa0b20' }}>Invalid Name</p>}
      </div>
      <div className={`${classes.control} ${streetHasError ? classes.invalid : ''}`}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          name="street"
          id="street"
          value={streetValue}
          onChange={streetChangeHandler}
          onBlur={onBlurStreet}
        />
        {streetHasError && <p style={{ color: '#aa0b20' }}>Invalid Street</p>}
      </div>
      <div className={`${classes.control} ${postalHasError ? classes.invalid : ''}`}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          name="postal"
          id="postal"
          value={postalValue}
          onChange={postalChangeHandler}
          onBlur={onBlurPostal}
        />
        {postalHasError && <p style={{ color: '#aa0b20' }}>Invalid Postal Code</p>}
      </div>
      <div className={`${classes.control} ${cityHasError ? classes.invalid : ''}`}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          value={cityValue}
          onChange={cityChangeHandler}
          onBlur={onBlurCity}
        />
        {cityHasError && <p style={{ color: '#aa0b20' }}>Invalid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
