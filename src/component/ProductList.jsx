import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Form, Row, Col, InputGroup } from 'react-bootstrap';
import ProductItem from './ProductItem';  // Import ProductItem component

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Tìm kiếm theo tên
  const [categoryFilter, setCategoryFilter] = useState(''); // Lọc theo danh mục
  const [categories, setCategories] = useState([]); // Lưu danh sách các danh mục duy nhất

  // Lấy dữ liệu từ localStorage khi trang được tải
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    if (storedProducts) {
      setProducts(storedProducts);
    }

    // Lấy danh sách danh mục duy nhất từ sản phẩm
    const uniqueCategories = [...new Set(storedProducts?.map(p => p.category) || [])];
    setCategories(uniqueCategories);
  }, []);

  // Cập nhật localStorage khi danh sách sản phẩm thay đổi
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const handleAddProduct = () => {
    const newProduct = {
      name,
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
    };

    // Thêm sản phẩm mới vào danh sách
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);

    // Cập nhật danh sách danh mục duy nhất
    const updatedCategories = [...new Set(updatedProducts.map(p => p.category))];
    setCategories(updatedCategories);

    // Cập nhật localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Reset các trường input
    setName('');
    setPrice('');
    setCategory('');
    setStock('');
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    
    // Cập nhật localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Cập nhật lại danh sách danh mục
    const updatedCategories = [...new Set(updatedProducts.map(p => p.category))];
    setCategories(updatedCategories);
  };

  // Lọc sản phẩm theo tên và danh mục
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter ? p.category === categoryFilter : true)
  );

  // Tính tổng số sản phẩm và tổng tồn kho
  const totalProducts = filteredProducts.length;
  const totalStock = filteredProducts.reduce((total, product) => total + product.stock, 0);

  return (
    <Container className="mt-4" style={{padding: "2.5%", backgroundColor: "#dddbf9", borderRadius: "24px", border: "1px solid blue"}}>
      <h2 className="mb-4 text-center text-primary">Danh sách sản phẩm</h2>

      {/* Ô tìm kiếm tên sản phẩm */}
      <Row className="mb-3">
        <Col md={4}>
          <InputGroup>
            <Form.Control
              className="input-search"
              placeholder="Tìm sản phẩm theo tên"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật từ khoá tìm kiếm theo tên
            />
          </InputGroup>
        </Col>
      </Row>

      {/* Dropdown lọc theo danh mục */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Select
            className="select-category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)} // Cập nhật danh mục lọc
          >
            <option value="">Lọc theo danh mục</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Form thêm sản phẩm */}
      <Row className="mb-3">
        <Col>
          <Form.Control
            className="input-form"
            placeholder="Tên sản phẩm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            className="input-form"
            type="number"
            placeholder="Giá"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            className="input-form"
            placeholder="Danh mục"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            className="input-form"
            type="number"
            placeholder="Tồn kho"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </Col>
        <Col>
          <Button className="btn-add-product" onClick={handleAddProduct}>Thêm sản phẩm</Button>
        </Col>
      </Row>

      {/* Bảng sản phẩm */}
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
          {filteredProducts.map((product, index) => (
            <ProductItem 
              key={index}
              product={product}
              index={index}
              handleDelete={handleDelete}
            />
          ))}
          {filteredProducts.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">Không có sản phẩm</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Hiển thị tổng số sản phẩm và tổng tồn kho */}
      <Row className="mt-4">
        <Col>
          <h5>Tổng số sản phẩm: {totalProducts}</h5>
          <h5>Tổng tồn kho: {totalStock}</h5>
          <h5>Mai Chí Tâm - 22644901</h5>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
