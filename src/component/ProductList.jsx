import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Form, Row, Col } from 'react-bootstrap';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddProduct = () => {
    const newProduct = {
      name,
      price: parseFloat(price),
      category,
      stock: parseInt(stock)
    };

    axios.post('http://localhost:3001/products', newProduct)
      .then((res) => {
        setProducts([...products, res.data]);
        setName('');
        setPrice('');
        setCategory('');
        setStock('');
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/products/${id}`)
      .then(() => {
        setProducts(products.filter(p => p.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Danh sách sản phẩm</h2>

      <Row className="mb-3">
        <Col>
          <Form.Control
            placeholder="Tên sản phẩm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            type="number"
            placeholder="Giá"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Danh mục"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            type="number"
            placeholder="Tồn kho"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </Col>
        <Col>
          <Button onClick={handleAddProduct}>Thêm sản phẩm</Button>
        </Col>
      </Row>

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
