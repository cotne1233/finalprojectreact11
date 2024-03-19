import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onDelete, onEdit, addToCart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortType, setSortType] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // Function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Function to handle sorting
  const handleSort = (type) => {
    if (type === sortType) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortType(type);
      setSortDirection('asc');
    }
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' ? products : products.filter(product => product.category === selectedCategory);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const isReversed = (sortDirection === 'asc') ? 1 : -1;
    return isReversed * a[sortType].localeCompare(b[sortType]);
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="food">Food</option>
        <option value="for home">For Home</option>
      </select>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('price')}>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={() => onDelete(product.id)}>Delete</button>
                <button onClick={() => onEdit(product)}>Edit</button>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="pagination">
        {Array.from({ length: Math.ceil(sortedProducts.length / productsPerPage) }, (_, i) => (
          <li key={i} className={currentPage === i + 1 ? 'active' : ''}>
            <button onClick={() => paginate(i + 1)}>{i + 1}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
