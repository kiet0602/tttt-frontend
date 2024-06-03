import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlockTitle from "../../components/BlockTitle/BlockTitle";
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
    const getProductsAll = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/product`);
        const filteredProducts = response.data.data.filter(
          (product) => product.category_id._id === categoryId
        );
        setProducts(filteredProducts);
        console.log(filteredProducts); // Debugging: Check the filtered products
      } catch (error) {
        console.log(error);
      }
    };
    getProductsAll();
  }, [categoryId]);

  return (
    <div className="container">
      <Header />

      <div className="row">
        <BlockTitle title={""} />
        {products &&
          products.map((product) => (
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
                <p>{product.price.toLocaleString()} VND</p>
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
