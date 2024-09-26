import React from "react";
import { Card, Col, Row, Spin } from "antd";
import productsData from "../data/products.json"; // Adjust the import path if necessary

const ProductPage = () => {
  console.log(productsData); // Log to see the data structure

  if (!productsData || productsData.length === 0) {
    return (
      <Spin
        size="large"
        style={{ display: "block", margin: "auto", marginTop: "50px" }}
      />
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Clothing Products</h2>
      <Row gutter={16}>
        {productsData.map((product) => (
          <Col span={8} key={product.id}>
            <Card hoverable style={{ textAlign: "center" }}>
              <img
                alt={product.name}
                src={product.image}
                style={{ width: "250px", height: "auto", marginBottom: "10px" }} // Ensures the image is responsive
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
    </div>
  );
};

export default ProductPage;
