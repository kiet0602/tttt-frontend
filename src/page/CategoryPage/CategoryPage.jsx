import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlockTitle from "../../components/BlockTitle/BlockTitle";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";

const CategoryPage = () => {
  const [categores, setCategores] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/category/${id}`
        );
        setCategores(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [id]);

  return (
    <div className="container">
      <Header />
      <HeadNavNoBanNer />
      <div className="row">
        {categores?.map((product) => (
          <div className="col-3 box-product mt-1" key={product._id}>
            <div className="text-center">
              <img
                className="img-fluid"
                src={`http://localhost:8000/${product.image}`}
                alt={product.name}
              />
              <span className="text-center">{product.name}</span>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
