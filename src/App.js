import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProductPage from "./components/Product";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
<<<<<<< HEAD
        <Route path="/products" element={<ProductPage />} />{" "}
=======
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
>>>>>>> add-products
        {/* New Product Page Route */}
      </Routes>
    </Router>
  );
};

export default App;
