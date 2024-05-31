import Layout from "../../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import imgPC from "../../assets/img/pc.png";
import { useNavigate } from "react-router-dom";
import HeaderNav from "../../components/header_nav/HeaderNav";
import "./ProductsAll.css";

const ProductAll = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/ProductDetails/${id}`);
  };

  useEffect(() => {
    const getProductsAll = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/product`);
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductsAll();
  }, []);

  return (
    <>
      <Layout>
        <HeaderNav />
        <div className="container mt-4">
          <p className="title-allproducts">TẤT CẢ SẢN PHẨM</p>
          <div className="row">
            {products.map((product) => (
              <div
                onClick={() => handleProductClick(product.id)}
                className="col-3 box-product mt-1"
                key={product.id}
              >
                <div className="text-center">
                  <img className="img-fluid" src={imgPC} alt="" />
                  <span className="text-center">{product.name}</span> <br />
                  <span className="text-center">
                    Loại: {product.category_id}
                  </span>
                  <p>{product.price}</p>
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
