import React, { useEffect, useState } from "react";
import axios from "axios";

import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";
import Header from "../../components/Header/Header";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductAll = () => {
  const [productsData, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input value
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const addCart = async (productId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
        navigate("/login");
        return;
      }

      const userId = userInfo?._id;
      await axios.post("http://localhost:8000/api/cart", {
        userId,
        productId,
        quantity: 1,
      });
      toast.success("Đã thêm sản phẩm vào giỏ hàng thành công!");
      fetchCartItems(userId);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
    }
  };

  useEffect(() => {
    // Fetch cart items when the component mounts
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      fetchCartItems(userInfo?._id);
    }
  }, []);

  useEffect(() => {
    const getProductsAll = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/product`);
        const filteredProducts = response.data.data.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    getProductsAll();
  }, [searchTerm]);

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
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartItemCount={cartItems.length}
      />
      <HeadNavNoBanNer />

      <div className="container mt-4">
        <div className="row">
          {productsData.length === 0 ? (
            <p className="text-center font-bold">
              Không có sản phẩm nào được tìm thấy.
            </p>
          ) : (
            productsData.map((product) => (
              <div className="col-3 box-product mt-1" key={product._id}>
                <div className="text-center">
                  <img
                    className="img-fluid"
                    src={`http://localhost:8000/${product.image}`}
                    alt={product.name}
                  />
                  <span className="text-center">
                    {product.name.substring(0, 40)}...
                  </span>
                  <p
                    style={{
                      color: "red",
                      fontSize: "20px",
                      fontWeight: "bolder",
                    }}
                  >
                    {product.price.toLocaleString()} VND
                  </p>
                  <button
                    style={{
                      border: "none",
                      backgroundColor: "blue",
                      borderRadius: "30px",
                      marginBottom: "15px",
                      color: "white",
                      padding: "10px",
                    }}
                    onClick={() => addCart(product._id)}
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProductAll;
