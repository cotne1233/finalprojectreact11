import React from 'react';
import Product from './Product';

const products = [
  { id: 1, name: 'Headphone', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  { id: 3, name: 'Product 3', price: 30 },
];

function ProductList({ addToCart }) {
  return (
    <div className="product-list">
      {products.map(product => (
        <Product key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}

export default ProductList;
