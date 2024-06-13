import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./HomePage.css";
import HeaderNav2 from "../../components/HeaderNav2/HeaderNav2";
import BannerNgang from "../../components/BannerNgang/BannerNgang";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
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

      // Lấy danh sách sản phẩm
      const productResponse = await axios.get(
        `http://localhost:8000/api/product`
      );
      const productData = productResponse?.data?.data;
      // Lọc sản phẩm dựa trên searchTerm
      const filteredProducts = productData.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [searchTerm]);
  const addCart = async (productId) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      navigate("/login");
      return;
    }
    const userId = userInfo?._id;
    try {
      await axios.post("http://localhost:8000/api/cart", {
        userId,
        productId,
        quantity: 1,
      });
      alert("Đã thêm sản phẩm thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
    }
    const response = await axios.get(
      `http://localhost:8000/api/cart/${userId}`
    );
    setCartItems(response?.data?.data?.items);
  };

  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartItemCount={cartItems.length}
      />
      <HeaderNav2 />
      <BannerNgang />
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div className="col-3 box-product mt-1" key={product._id}>
              <div className="text-center">
                <img
                  style={{ width: "300px", height: "150px" }}
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
                  {product.price.toLocaleString()} đ
                </p>
                <div className="d-flex">
                  <div>
                    <button
                      className="btnAddProduct"
                      onClick={() => addCart(product._id)}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                  <div>
                    <button
                      className="btnProduct"
                      onClick={(e) => {
                        navigate(`/ProductDetails/${product._id}`);
                      }}
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
