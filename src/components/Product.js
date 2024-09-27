import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Spin,
  Modal,
  Layout,
  Menu,
  Button,
  Divider,
} from "antd";
import productsData from "../data/products.json"; // Adjust the import path if necessary
import "./Product.css"; // Import custom styles

const { Header, Content, Sider } = Layout;

const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  if (!productsData || Object.keys(productsData).length === 0) {
    return (
      <Spin
        size="large"
        style={{ display: "block", margin: "auto", marginTop: "50px" }}
      />
    );
  }

  const allProducts = [
    ...(productsData.men || []),
    ...(productsData.women || []),
    ...(productsData.girls || []),
    ...(productsData.boys || []),
    ...(productsData.kids || []),
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? allProducts
      : productsData[selectedCategory] || [];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSelectedSize(null);
    setSelectedColor(null);
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      const newCartItem = {
        ...selectedProduct,
        selectedSize,
        selectedColor,
      };

      const itemExists = cartItems.some(
        (item) =>
          item.id === newCartItem.id &&
          item.selectedSize === newCartItem.selectedSize &&
          item.selectedColor === newCartItem.selectedColor
      );

      if (!itemExists) {
        setCartItems((prevItems) => [...prevItems, newCartItem]);
        alert(`${selectedProduct.name} has been added to your cart!`);
        handleModalClose();
      } else {
        alert("This item is already in your cart.");
      }
    } else {
      alert("Please select a size and color before adding to cart.");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <h2 className="header-title">Clothing Products</h2>
      </Header>

      <Layout>
        <Sider width={300} className="sidebar">
          <Menu
            mode="inline"
            defaultSelectedKeys={["all"]}
            className="category-menu"
          >
            <Menu.Item key="all" onClick={() => setSelectedCategory("all")}>
              All
            </Menu.Item>
            <Menu.Item key="men" onClick={() => setSelectedCategory("men")}>
              Men
            </Menu.Item>
            <Menu.Item key="women" onClick={() => setSelectedCategory("women")}>
              Women
            </Menu.Item>
            <Menu.Item key="girls" onClick={() => setSelectedCategory("girls")}>
              Girls
            </Menu.Item>
            <Menu.Item key="boys" onClick={() => setSelectedCategory("boys")}>
              Boys
            </Menu.Item>
            <Menu.Item key="kids" onClick={() => setSelectedCategory("kids")}>
              Kids
            </Menu.Item>
          </Menu>

          <CartItems cartItems={cartItems} />
        </Sider>

        <Layout style={{ padding: "20px" }}>
          <Content>
            <Row gutter={[16, 24]}>
              {filteredProducts.map((product) => (
                <Col span={8} key={product.id}>
                  <ProductCard
                    product={product}
                    onClick={() => handleProductClick(product)}
                  />
                </Col>
              ))}
            </Row>
          </Content>
        </Layout>
      </Layout>

      <ProductModal
        selectedProduct={selectedProduct}
        onClose={handleModalClose}
        onAddToCart={handleAddToCart}
        setSelectedSize={setSelectedSize}
        setSelectedColor={setSelectedColor}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
      />
    </Layout>
  );
};

// Component for displaying cart items
const CartItems = ({ cartItems }) => (
  <div className="cart-items">
    <h3>Cart Items</h3>
    {cartItems.length > 0 ? (
      <Menu mode="inline" className="cart-menu">
        {cartItems.map((item, index) => (
          <Menu.Item key={index} className="cart-item">
            <span>
              <strong>{item.name}</strong>
              <br />
              Size: {item.selectedSize}, Color: {item.selectedColor}
            </span>
            <span className="cart-price">${item.price.toFixed(2)}</span>
          </Menu.Item>
        ))}
      </Menu>
    ) : (
      <p>No items in the cart</p>
    )}
  </div>
);

// Component for displaying individual product cards
const ProductCard = ({ product, onClick }) => (
  <Card
    hoverable
    onClick={onClick}
    className="product-card"
    cover={
      <img alt={product.name} src={product.image} className="product-image" />
    }
  >
    <h3 className="product-name">{product.name}</h3>
    <p className="product-price">${product.price.toFixed(2)}</p>
    <p className="product-description">{product.description}</p>
    <Divider />
    <Button type="primary" onClick={onClick}>
      View Details
    </Button>
  </Card>
);

// Component for displaying product modal
const ProductModal = ({
  selectedProduct,
  onClose,
  onAddToCart,
  setSelectedSize,
  setSelectedColor,
  selectedSize,
  selectedColor,
}) => (
  <Modal
    title={selectedProduct ? selectedProduct.name : ""}
    visible={!!selectedProduct}
    onCancel={onClose}
    footer={null}
    width={600}
    className="product-modal"
  >
    {selectedProduct && (
      <div className="modal-content">
        <img
          alt={selectedProduct.name}
          src={selectedProduct.image}
          className="modal-image"
        />
        <h3 className="modal-product-name">{selectedProduct.name}</h3>
        <p className="modal-product-price">
          ${selectedProduct.price.toFixed(2)}
        </p>
        <p className="modal-product-description">
          {selectedProduct.description}
        </p>
        <p>
          <strong>Category:</strong> {selectedProduct.category}
        </p>

        {/* Size Selection */}
        <SizeSelection
          sizes={selectedProduct.size}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />

        {/* Color Selection */}
        <ColorSelection
          colors={selectedProduct.color}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />

        {/* Additional product details */}
        <p>
          <strong>Brand:</strong> {selectedProduct.brand}
        </p>
        <p>
          <strong>Rating:</strong> {selectedProduct.rating} ⭐
        </p>
        <p>
          <strong>Stock:</strong> {selectedProduct.stock} available
        </p>

        {/* Add to Cart Button */}
        <Button
          type="primary"
          onClick={onAddToCart}
          className="add-to-cart-button"
        >
          Add to Cart
        </Button>
      </div>
    )}
  </Modal>
);

// Component for selecting sizes
const SizeSelection = ({ sizes, selectedSize, setSelectedSize }) => (
  <div className="size-selection">
    <strong>Select Size:</strong>
    <div>
      {sizes.map((size) => (
        <Button
          key={size}
          onClick={() => setSelectedSize(size)}
          className={`size-button ${selectedSize === size ? "active" : ""}`}
        >
          {size}
        </Button>
      ))}
    </div>
  </div>
);

// Component for selecting colors
const ColorSelection = ({ colors, selectedColor, setSelectedColor }) => (
  <div className="color-selection">
    <strong>Select Color:</strong>
    <div>
      {colors.map((color) => (
        <Button
          key={color}
          onClick={() => setSelectedColor(color)}
          className={`color-button ${selectedColor === color ? "active" : ""}`}
          style={{ backgroundColor: color }}
        >
          {color}
        </Button>
      ))}
    </div>
  </div>
);

export default ProductPage;
