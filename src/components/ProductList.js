import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onDelete, onEdit }) => {
  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id}>
          <ProductCard product={product} />
          <button onClick={() => onDelete(product.id)}>Delete</button>
          <button onClick={() => onEdit(product)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
