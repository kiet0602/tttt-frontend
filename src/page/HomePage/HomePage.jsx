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
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Gọi fetchCartItems khi component được render
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      fetchCartItems(userInfo._id);
    }
  }, []); // [] để đảm bảo fetchCartItems chỉ được gọi một lần khi component được render

  useEffect(() => {
    // Cập nhật cartItemCount sau khi cartItems được cập nhật
    const cartItemCount = cartItems.length;
    // Cập nhật cartItemCount ở đây
  }, [cartItems]);

  const fetchCartItems = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/cart/${userId}`
      );
      setCartItems(response.data.data.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

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
        const productData = productResponse.data.data;
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
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartItemCount={cartItems.length}
      />
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
