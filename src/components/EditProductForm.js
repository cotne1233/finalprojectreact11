import React, { useState, useEffect } from 'react';

const EditProductForm = ({ product, onSave }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedProduct);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={editedProduct.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={editedProduct.price}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={editedProduct.description}
        onChange={handleChange}
      ></textarea>
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={editedProduct.image}
        onChange={handleChange}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditProductForm;
