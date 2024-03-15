import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import LoginForm from './components/LoginForm';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const total = cartItems.reduce((acc, item) => {
    return acc + parseFloat(item.price || 0);
  }, 0);

  const handleRegister = (username, password) => {
    setRegisteredUsers([...registeredUsers, { username, password }]);
    alert('Registration successful. Please login.');
  };

  const handleLogin = (username, password) => {
    const user = registeredUsers.find(user => user.username === username && user.password === password);
    if (user) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password.');
    }
  };

  const handleAddProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleSaveEditedProduct = (editedProduct) => {
    setProducts(products.map(product =>
      product.id === editedProduct.id ? editedProduct : product
    ));
    setSelectedProduct(null);
  };

  const handleCheckout = () => {
    alert('Thank you for your purchase!');
    setCartItems([]); 
  };

  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>GEO-MARKET</h1>
        {!isLoggedIn ? (
          <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
        ) : (
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
                <button onClick={handleCheckout}>Checkout</button>
              </div>
            )}
            <AddProductForm onAddProduct={handleAddProduct} />
          </div>
        )}
        <div className="search">
          <input
            type="text"
            placeholder="Search Products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>
      {isLoggedIn && (
        <main>
          <ProductList 
            products={filteredProducts} 
            onDelete={handleDeleteProduct} 
            onEdit={handleEditProduct} 
            addToCart={addToCart} 
          />
          {selectedProduct && (
            <EditProductForm 
              product={selectedProduct} 
              onSave={handleSaveEditedProduct} 
            />
          )}
        </main>
      )}
      <footer>
        <p>&copy; created by cotne zaalishvili</p>
      </footer>
    </div>
  );
}

export default App;
