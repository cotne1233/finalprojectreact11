import React, { useState } from 'react';

const AddProductForm = ({ onAddProduct }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: 'electronics', // Default category is electronics
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.name && product.price) {
      onAddProduct(product);
      setProduct({ name: '', price: '', description: '', image: '', category: 'electronics' });
    } else {
      alert('Please enter product name and price.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
      ></textarea>
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={product.image}
        onChange={handleChange}
      />
      <select name="category" value={product.category} onChange={handleChange}>
        <option value="electronics">Electronics</option>
        <option value="food">Food</option>
        <option value="for home">For Home</option>
      </select>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
