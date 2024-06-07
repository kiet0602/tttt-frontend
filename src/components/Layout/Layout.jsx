import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";

const Layout = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items when the component mounts
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      fetchCartItems(userInfo._id);
    }
  }, []);

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
  return (
    <div>
      <Header cartItemCount={cartItems.length} />
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
