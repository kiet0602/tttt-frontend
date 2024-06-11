import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlockTitle from "../../components/BlockTitle/BlockTitle";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeaderNavRightNoBANNER from "../../components/HeaderNavRight-noBANNER/HeaderNavRightNoBANNER";

const CategoryPage = () => {
  const { _id } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/ProductDetails/${id}`);
  };

  useEffect(() => {
    const getProductsByCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/product ${_id}`
        );
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductsByCategory();
  }, [_id]);

  return (
    <div className="container">
      <Header />
      <HeaderNavRightNoBANNER />
      <div className="row">
        <BlockTitle title={products[0]?.category_id.name} />
        {products.map((product) => (
          <div
            onClick={() => handleProductClick(product._id)}
            className="col-3 box-product mt-1"
            key={product._id}
          >
            <div className="text-center">
              <img
                className="img-fluid"
                src={`http://localhost:8000/${product.image}`}
                alt={product.name}
              />
              <span className="text-center">{product.name}</span>
              <p>{product.price.toLocaleString()} đ</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
