import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";
import { ToastContainer, toast } from "react-toastify";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
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

  const addCart = async (productId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
        navigate("/login");
        return;
      }

      const userId = userInfo._id;
      await axios.post("http://localhost:8000/api/cart", {
        userId,
        productId,
        quantity: 1,
      });
      toast.success("Đã thêm sản phẩm vào giỏ hàng thành công!");

      // Fetch updated cart items
      fetchCartItems(userId);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getProductsCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/category/${id}`
        );
        const productData = response.data.products;
        const filteredProducts = productData.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProductsCategory();
  }, [id, searchTerm]);

  return (
    <div className="container">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartItemCount={cartItems.length}
      />
      <HeadNavNoBanNer />
      <div className="row">
        {products.length === 0 ? (
          <p className="text-center font-bold">
            Không có sản phẩm nào được tìm thấy.
          </p>
        ) : (
          products.map((product) => (
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
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default CategoryPage;
