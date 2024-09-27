import React, { useState } from "react";
import { Card, Col, Row, Spin, Modal, Layout, Menu, Button } from "antd";
import productsData from "../data/products.json"; // Adjust the import path if necessary

const { Header, Content, Sider } = Layout;

const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null); // State for the selected product
  const [selectedCategory, setSelectedCategory] = useState("all"); // State for the selected category
  const [selectedSize, setSelectedSize] = useState(null); // State for selected size
  const [selectedColor, setSelectedColor] = useState(null); // State for selected color
  const [cartItems, setCartItems] = useState([]); // State for cart items

  // Show spinner if no product data
  if (!productsData || Object.keys(productsData).length === 0) {
    return (
      <Spin
        size="large"
        style={{ display: "block", margin: "auto", marginTop: "50px" }}
      />
    );
  }

  // Access all products based on categories
  const allProducts = [
    ...(productsData.men || []),
    ...(productsData.women || []),
    ...(productsData.girls || []),
    ...(productsData.boys || []),
    ...(productsData.kids || []),
  ];

  // Determine the products to display based on the selected category
  const filteredProducts =
    selectedCategory === "all"
      ? allProducts
      : productsData[selectedCategory] || []; // Fetch products based on selected category

  // Function to handle product click
  const handleProductClick = (product) => {
    setSelectedProduct(product); // Set the clicked product as selected
    setSelectedSize(null); // Reset selected size
    setSelectedColor(null); // Reset selected color
  };

  // Function to handle modal close
  const handleModalClose = () => {
    setSelectedProduct(null); // Clear the selected product
  };

  // Function to handle adding to cart
  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      const newCartItem = {
        ...selectedProduct,
        selectedSize,
        selectedColor,
      };
      setCartItems((prevItems) => [...prevItems, newCartItem]); // Add item to cart
      alert(`${selectedProduct.name} has been added to your cart!`);
      handleModalClose(); // Close modal after adding to cart
    } else {
      alert("Please select a size and color before adding to cart.");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <h2 style={{ color: "white", textAlign: "center" }}>
          Clothing Products
        </h2>
      </Header>
      <Layout>
        <Sider width={300} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["all"]}
            style={{ height: "100%", borderRight: 0 }}
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

          {/* Display Cart Items */}
          <div style={{ padding: "10px", borderTop: "1px solid #ccc" }}>
            <h3>Cart Items</h3>
            {cartItems.length > 0 ? (
              <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                {cartItems.map((item, index) => (
                  <li key={index} style={{ marginBottom: "10px" }}>
                    <strong>{item.name}</strong> <br />
                    Size: {item.selectedSize}, Color: {item.selectedColor}{" "}
                    <br />
                    <span style={{ fontWeight: "bold" }}>
                      ${item.price.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items in the cart</p>
            )}
          </div>
        </Sider>
        <Layout style={{ padding: "20px" }}>
          <Content>
            <Row gutter={16}>
              {filteredProducts.map((product) => (
                <Col span={8} key={product.id}>
                  <Card
                    hoverable
                    onClick={() => handleProductClick(product)} // Set selected product on click
                  >
                    <img
                      alt={product.name}
                      src={product.image}
                      style={{ width: "250px", height: "auto" }} // Responsive image
                    />
                    <h3>{product.name}</h3>
                    <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
                      ${product.price.toFixed(2)}
                    </p>
                    <p>{product.description}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </Content>
        </Layout>
      </Layout>

      {/* Modal for displaying product details */}
      <Modal
        title={selectedProduct ? selectedProduct.name : ""} // Title is the product name
        visible={!!selectedProduct} // Show modal if a product is selected
        onCancel={handleModalClose} // Close modal
        footer={null} // No footer buttons
        width={600} // Optional: Set modal width
      >
        {selectedProduct && ( // Only render if there is a selected product
          <div style={{ textAlign: "center" }}>
            <img
              alt={selectedProduct.name}
              src={selectedProduct.image}
              style={{ width: "100%", height: "auto" }} // Responsive image
            />
            <h3>{selectedProduct.name}</h3>
            <p style={{ fontWeight: "bold", fontSize: "20px" }}>
              ${selectedProduct.price.toFixed(2)}
            </p>
            <p>{selectedProduct.description}</p>
            <p>
              <strong>Category:</strong> {selectedProduct.category}
            </p>

            {/* Size Selection */}
            <div>
              <strong>Select Size:</strong>
              <div>
                {selectedProduct.size.map((size) => (
                  <Button
                    key={size}
                    onClick={() => setSelectedSize(size)} // Set selected size
                    style={{
                      margin: "5px",
                      backgroundColor: selectedSize === size ? "#1890ff" : "",
                      color: selectedSize === size ? "white" : "",
                    }}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <strong>Select Color:</strong>
              <div>
                {selectedProduct.color.map((color) => (
                  <Button
                    key={color}
                    onClick={() => setSelectedColor(color)} // Set selected color
                    style={{
                      margin: "5px",
                      backgroundColor: selectedColor === color ? "#1890ff" : "",
                      color: selectedColor === color ? "white" : "",
                    }}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Display additional product details */}
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
              onClick={handleAddToCart}
              style={{ marginTop: "20px" }}
            >
              Add to Cart
            </Button>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default ProductPage;
