import React from "react";
import "./ProductsDetail.css";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const ProductDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <Header />

      <Footer />
    </div>
  );
};

export default ProductDetails;
