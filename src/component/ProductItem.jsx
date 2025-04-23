// src/components/ProductItem.jsx
import React from 'react';
import { Button } from 'react-bootstrap';

const ProductItem = ({ product, index, handleDelete }) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.category}</td>
      <td>{product.stock}</td>
      <td>
        <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>
          Xoá
        </Button>
      </td>
    </tr>
  );
};

export default ProductItem;
