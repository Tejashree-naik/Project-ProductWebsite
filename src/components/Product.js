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
  const [orderedItems, setOrderedItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isOrderVisible, setIsOrderVisible] = useState(false);

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
      : productsData[selectedCategory] || []; // Ensure only selected category products are shown

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

  const handleBuyNow = (item) => {
    setOrderedItems((prevItems) => [...prevItems, item]);
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== item.id)
    );
    alert(`${item.name} has been ordered!`);
  };

  const handleCartClick = () => {
    setIsCartVisible(true);
  };

  const handleCartClose = () => {
    setIsCartVisible(false);
  };

  const handleOrderClick = () => {
    setIsOrderVisible(true);
  };

  const handleOrderClose = () => {
    setIsOrderVisible(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className="star">
          {i < Math.round(rating) ? "⭐" : "☆"}
        </span>
      );
    }
    return stars;
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

          <Button
            type="primary"
            className="view-cart-button"
            onClick={handleCartClick}
            style={{ marginBottom: "10px" }}
          >
            View Cart
          </Button>

          <Button
            type="primary"
            className="view-orders-button"
            onClick={handleOrderClick}
          >
            View Orders
          </Button>
        </Sider>

        <Layout style={{ padding: "20px" }}>
          <Content>
            <Row gutter={[16, 24]}>
              {filteredProducts.map((product) => (
                <Col span={8} key={product.id}>
                  <ProductCard
                    product={product}
                    onClick={() => handleProductClick(product)}
                    renderStars={renderStars} // Pass renderStars function
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

      <CartModal
        visible={isCartVisible}
        onClose={handleCartClose}
        cartItems={cartItems}
        onBuyNow={handleBuyNow}
      />

      <OrderModal
        visible={isOrderVisible}
        onClose={handleOrderClose}
        orderedItems={orderedItems}
      />
    </Layout>
  );
};

// Component for displaying individual product cards
const ProductCard = ({ product, onClick, renderStars }) => (
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
    <p className="product-rating">Rating: {renderStars(product.rating)}</p>
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
          <strong>Rating:</strong> {selectedProduct.rating} ⭐
        </p>

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

// Component for displaying cart items in a modal
const CartModal = ({ visible, onClose, cartItems, onBuyNow }) => (
  <Modal
    title="Your Cart"
    visible={visible}
    onCancel={onClose}
    footer={null}
    width={700}
    className="cart-modal"
  >
    {cartItems.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} className="cart-item-image" />
          <div className="cart-item-details">
            <h4>{item.name}</h4>
            <p>Size: {item.selectedSize}</p>
            <p>Color: {item.selectedColor}</p>
            <p>${item.price.toFixed(2)}</p>
            <Button type="primary" onClick={() => onBuyNow(item)}>
              Buy Now
            </Button>
          </div>
        </div>
      ))
    )}
  </Modal>
);

// Component for displaying ordered items in a modal
const OrderModal = ({ visible, onClose, orderedItems }) => (
  <Modal
    title="Your Orders"
    visible={visible}
    onCancel={onClose}
    footer={null}
    width={700}
    className="order-modal"
  >
    {orderedItems.length === 0 ? (
      <p>You have no orders.</p>
    ) : (
      orderedItems.map((item) => (
        <div key={item.id} className="order-item">
          <img src={item.image} alt={item.name} className="order-item-image" />
          <div className="order-item-details">
            <h4>{item.name}</h4>
            <p>Size: {item.selectedSize}</p>
            <p>Color: {item.selectedColor}</p>
            <p>${item.price.toFixed(2)}</p>
          </div>
        </div>
      ))
    )}
  </Modal>
);

// Component for selecting sizes
const SizeSelection = ({ sizes, selectedSize, setSelectedSize }) => (
  <div className="size-selection">
    <p>Select Size:</p>
    {sizes.map((size) => (
      <Button
        key={size}
        type={selectedSize === size ? "primary" : "default"}
        onClick={() => setSelectedSize(size)}
      >
        {size}
      </Button>
    ))}
  </div>
);

// Component for selecting colors
const ColorSelection = ({ colors, selectedColor, setSelectedColor }) => (
  <div className="color-selection">
    <p>Select Color:</p>
    {colors.map((color) => (
      <Button
        key={color}
        type={selectedColor === color ? "primary" : "default"}
        style={{ backgroundColor: color, borderColor: color }}
        onClick={() => setSelectedColor(color)}
      >
        {color}
      </Button>
    ))}
  </div>
);

export default ProductPage;
