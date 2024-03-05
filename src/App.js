import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const total = cartItems.reduce((acc, item) => {
    console.log("Item price:", item.price);
    return acc + parseFloat(item.price || 0);
  }, 0);

  console.log("Total:", total);

  return (
    <div className="App">
      <header className="App-header">
        <h1>GEO-MARKET</h1>
        <div className="cart">
          <button className="cart-button" onClick={toggleCart}>
            Cart ({cartItems.length})
          </button>
          {showCart && (
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </div>
              ))}
              <div className="total">
                Total: ${total.toFixed(2)}
              </div>
            </div>
          )}
        </div>
      </header>
      <main>
        <ProductList addToCart={addToCart} />
      </main>
      <footer>
        <p>&copy; created by cotne zaalishvili</p>
      </footer>
    </div>
  );
}

export default App;