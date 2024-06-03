import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Layout from "../../components/Layout/Layout";
import HeaderNav from "../../components/header_nav/HeaderNav";
import BlockTitle from "../../components/BlockTitle/BlockTitle";
import ListCard from "../../components/ListCard/ListCard";
import axios from "axios";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/category`);
        const { data } = response;
        setCategories(data);
        console.log(data);
        console.log("tra ve", response);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);

  return (
    <Layout>
      <HeaderNav />

      {categories.slice(0, 6).map((category) => (
        <div key={category._id}>
          <BlockTitle title={category.name} />

          <ListCard
            products={category.categories.map((product) => ({
              ...product,
              category: {
                id: category._id,
                name: category.name,
              },
            }))}
          />
        </div>
      ))}
    </Layout>
  );
};

export default HomePage;
