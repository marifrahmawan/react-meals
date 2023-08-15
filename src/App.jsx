import { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import { CartProvider } from './store/cart-context';

const App = () => {
  const [showCart, setShowCart] = useState(false);

  const showCarthandler = () => {
    setShowCart(!showCart);
  };

  return (
    <CartProvider>
      {showCart && <Cart onClick={showCarthandler} />}
      <Header onClick={showCarthandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
