import React, { useState } from "react";
import { Card, Col, Row, Spin, Modal, Layout, Menu } from "antd";
import productsData from "../data/products.json"; // Adjust the import path if necessary

const { Header, Content, Sider } = Layout;

const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null); // State for the selected product
  const [selectedCategory, setSelectedCategory] = useState("all"); // State for the selected category

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
  };

  // Function to handle modal close
  const handleModalClose = () => {
    setSelectedProduct(null); // Clear the selected product
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <h2 style={{ color: "white", textAlign: "center" }}>
          Clothing Products
        </h2>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: "#fff" }}>
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
            <p>
              <strong>Size:</strong> {selectedProduct.size.join(", ")}
            </p>
            <p>
              <strong>Color:</strong> {selectedProduct.color.join(", ")}
            </p>
            <p>
              <strong>Brand:</strong> {selectedProduct.brand}
            </p>
            <p>
              <strong>Rating:</strong> {selectedProduct.rating} ⭐
            </p>
            <p>
              <strong>Stock:</strong> {selectedProduct.stock} available
            </p>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default ProductPage;
