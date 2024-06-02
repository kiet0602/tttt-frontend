import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlockTitle from "../../components/BlockTitle/BlockTitle";
import imgPC from "../../assets/img/pc.png";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/ProductDetails/${id}`);
  };

  useEffect(() => {
    const getProductsByCategory = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8003/product?category_id=${categoryId}`
        );
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductsByCategory();
  }, [categoryId]);

  return (
    <div className="container">
      <Header />

      <div className="row">
        <BlockTitle title={categoryId} />
        {products.map((product) => (
          <div
            onClick={() => handleProductClick(product.id)}
            className="col-3 box-product mt-1"
            key={product.id}
          >
            <div className="text-center">
              <img className="img-fluid" src={imgPC} alt="" />
              <span className="text-center">{product.name}</span>
              <p>{product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
