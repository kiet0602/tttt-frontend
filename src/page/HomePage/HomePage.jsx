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

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/product`);
        setProducts(data);
        console.log(data);
        // Extract unique categories
        const uniqueCategories = [
          ...new Set(data.map((product) => product.category_id)),
        ];
        console.log(uniqueCategories);
        setCategories(uniqueCategories);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProducts();
  }, []);

  return (
    <Layout>
      <HeaderNav />
      {categories.map((category) => (
        <div key={category}>
          <BlockTitle title={category} />
          <ListCard
            products={products.filter((p) => p.category_id === category)}
          />
        </div>
      ))}
    </Layout>
  );
};

export default HomePage;
