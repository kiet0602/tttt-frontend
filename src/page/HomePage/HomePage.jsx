import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderNav from "../../components/header_nav/HeaderNav";
import BlockTitle from "../../components/BlockTitle/BlockTitle";
import ListCard from "../../components/ListCard/ListCard";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Gọi fetchCartItems khi component được render
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      fetchCartItems(userInfo?._id);
    }
  }, []);

  const fetchCartItems = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/cart/${userId}`
      );
      setCartItems(response?.data?.data?.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
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
      const productData = productResponse?.data?.data;
      // Lọc sản phẩm dựa trên searchTerm
      const filteredProducts = productData.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
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
      <Footer />
    </>
  );
};

export default HomePage;
