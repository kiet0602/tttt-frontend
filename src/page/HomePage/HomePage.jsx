import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import HeaderNav from "../../components/header_nav/HeaderNav";
import BlockTitle from "../../components/BlockTitle/BlockTitle";
import ListCard from "../../components/ListCard/ListCard";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import { useSelector, useDispatch } from "react-redux";
import { AddProduct, DeleteProduct } from "../../redux/slice/CartSlice";

const HomePage = () => {
  const CartProducts = useSelector((state) => state.cart.CartArr);
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        // Lấy danh sách danh mục
        const categoryResponse = await axios.get(
          `http://localhost:8000/api/category`
        );
        const categoryData = categoryResponse.data;

        // Lọc danh mục dựa trên searchTerm
        const filteredCategories = categoryData.filter((category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setCategories(filteredCategories);

        // Lấy danh sách sản phẩm
        const productResponse = await axios.get(
          `http://localhost:8000/api/product`
        );
        const productData = productResponse.data;

        // Lọc sản phẩm dựa trên searchTerm
        const filteredProducts = productData.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setProducts(filteredProducts);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [searchTerm]);

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
      {/*   <ListCard products={products} /> */}
      <Footer />
    </>
  );
};

export default HomePage;
