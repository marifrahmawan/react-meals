import { useReducer } from 'react';

const initialState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value };
  }

  if (action.type === 'BLUR') {
    return { value: state.value, isTouched: true };
  }

  if (action.type === 'RESET') {
    return { value: '', isTouched: false };
  }
  return inputStateReducer;
};

const useInput = (validateFn) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialState);

  const isValid = validateFn(inputState.value);
  const hasError = !isValid && inputState.isTouched;

  const inputChangeHandler = (e) => {
    dispatch({ type: 'INPUT', value: e.target.value });
  };

  const onBlurValue = () => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid,
    inputChangeHandler,
    onBlurValue,
    hasError,
    reset,
  };
};

export default useInput;
