import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container } from 'react-bootstrap';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/products/${id}`)
      .then(() => setProducts(products.filter(p => p.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Danh sách sản phẩm</h2>
      <button className="btn btn-primary">Thêm</button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Tồn kho</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.category}</td>
              <td>{p.stock}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>
                  Xoá
                </Button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">Không có sản phẩm</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProductList;
