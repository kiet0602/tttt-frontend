import Layout from "../../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderNav from "../../components/header_nav/HeaderNav";
import "./ProductsAll.css";
import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";

const ProductAll = () => {
  const [productsData, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleProductClick = (_id) => {
    navigate(`/ProductDetails/${_id}`);
  };

  useEffect(() => {
    const getProductsAll = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/product`);
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductsAll();
  }, []);
  return (
    <>
      <Layout>
        <HeadNavNoBanNer />
        <div className="container mt-4">
          <p className="title-allproducts">TẤT CẢ SẢN PHẨM</p>
          <div className="row">
            {productsData.map((product) => (
              <div
                onClick={() => handleProductClick(product.id)}
                className="col-3 box-product mt-1"
                key={product.id}
              >
                <div className="text-center">
                  <img
                    className="img-fluid"
                    src={`http://localhost:8000/${product.image}`}
                    alt=""
                  />
                  <span className="text-center">{product.name}</span> <br />
                  <span className="text-center">
                    Loại: {product.category_id.name}
                  </span>
                  <p>{product.price.toLocaleString()} VND</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProductAll;
