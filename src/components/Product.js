import React, { useState } from "react";
import { Card, Col, Row, Spin, Modal } from "antd";
import productsData from "../data/products.json"; // Adjust the import path if necessary

const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null); // State for the selected product

  // Log to see the data structure
  console.log(productsData);

  // Show spinner if no product data
  if (!productsData || productsData.length === 0) {
    return (
      <Spin
        size="large"
        style={{ display: "block", margin: "auto", marginTop: "50px" }}
      />
    );
  }

  // Function to handle product click
  const handleProductClick = (product) => {
    setSelectedProduct(product); // Set the clicked product as selected
  };

  // Function to handle modal close
  const handleModalClose = () => {
    setSelectedProduct(null); // Clear the selected product
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Clothing Products</h2>
      <Row gutter={16}>
        {productsData.map((product) => (
          <Col span={8} key={product.id}>
            <Card
              hoverable
              style={{ textAlign: "center", cursor: "pointer" }} // Change cursor to pointer
              onClick={() => handleProductClick(product)} // Set selected product on click
            >
              <img
                alt={product.name}
                src={product.image}
                style={{ width: "250px", height: "auto", marginBottom: "10px" }} // Responsive image
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
              style={{ width: "100%", height: "auto", marginBottom: "10px" }} // Responsive image
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
    </div>
  );
};

export default ProductPage;
