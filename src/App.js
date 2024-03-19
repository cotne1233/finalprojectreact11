import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import LoginForm from './components/LoginForm';
import { FaLanguage } from 'react-icons/fa';

function App() {
  const [language, setLanguage] = useState('en'); // Default language is English

  // Define language strings
  const languageStrings = {
    en: {
      greeting: 'Welcome to GEO-MARKET',
      searchPlaceholder: 'Search Products',
      checkout: 'Checkout',
      // Add more English strings as needed
    },
    fr: {
      greeting: 'Bienvenue sur GEO-MARKET',
      searchPlaceholder: 'Rechercher des produits',
      checkout: 'Check-out',
      // Add more French strings as needed
    },
    es: {
      greeting: 'Bienvenido a GEO-MARKET',
      searchPlaceholder: 'Buscar productos',
      checkout: 'Revisar',
      // Add more Spanish strings as needed
    },
    de: {
      greeting: 'Willkommen bei GEO-MARKET',
      searchPlaceholder: 'Produkte durchsuchen',
      checkout: 'Auschecken',
      // Add more German strings as needed
    },
    it: {
      greeting: 'Benvenuti su GEO-MARKET',
      searchPlaceholder: 'Cerca prodotti',
      checkout: 'Check-out',
      // Add more Italian strings as needed
    },
  };

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
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
    // Add user to registeredUsers state
    setRegisteredUsers([...registeredUsers, { username, password }]);
    alert('Registration successful. Please login.');
  };

  const handleLogin = (username, password) => {
    // Check if username and password match any registered user
    const user = registeredUsers.find(user => user.username === username && user.password === password);
    if (user) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password.');
    }
  };

  const handleBecomeAdmin = () => {
    if (adminPassword === '000') {
      setIsAdmin(true);
      setAdminPassword('');
    } else {
      alert('Incorrect admin password.');
    }
  };

  const handleAddProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (productId) => {
    if (isAdmin) {
      setProducts(products.filter(product => product.id !== productId));
    } else {
      alert('Only admins can remove products.');
    }
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

  // Toggle language between available languages
  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  // Select language strings based on current language
  const strings = languageStrings[language];

  // Generate language options for the language switch
  const languageOptions = Object.keys(languageStrings).map(lang => (
    <button key={lang} onClick={() => toggleLanguage(lang)}>{lang}</button>
  ));

  return (
    <div className="App">
      <header className="App-header">
        <div className="language-switch">
          <FaLanguage />
          <div className="language-options">
            {languageOptions}
          </div>
        </div>
        <h1>{strings.greeting}</h1>
        {!isLoggedIn ? (
          <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
        ) : isAdmin ? (
          <div className="admin-actions">
            <input type="password" placeholder="Enter Admin Password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
            <button onClick={handleBecomeAdmin}>Become Admin</button>
            <AddProductForm onAddProduct={handleAddProduct} />
          </div>
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
                  {strings.checkout}: ${total.toFixed(2)}
                </div>
                <button onClick={handleCheckout}>{strings.checkout}</button>
              </div>
            )}
          </div>
        )}
        <div className="search">
          <input
            type="text"
            placeholder={strings.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {isLoggedIn && !isAdmin && (
          <div className="admin-password">
            <input type="password" placeholder="Enter Admin Password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
            <button onClick={handleBecomeAdmin}>Become Admin</button>
          </div>
        )}
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
