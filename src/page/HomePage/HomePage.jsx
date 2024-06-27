import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./HomePage.css";
import HeaderNav2 from "../../components/HeaderNav2/HeaderNav2";
import BannerNgang from "../../components/BannerNgang/BannerNgang";
import BlockTitle from "../../components/BlockTitle/BlockTitle";
import Imgnohu from "../../assets/img/Remove-bg.ai_1718353271598.png";
import ImgReview from "../../assets/img/Remove-bg.ai_1718353933691.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [highlyRatedProducts, setHighlyRatedProducts] = useState([]);

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
      setCartItems(response?.data?.data?.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const getData = async () => {
    try {
      // Fetch top 8 products by sold quantity
      const topSellingResponse = await axios.get(
        `http://localhost:8000/api/product/criteria?sortBy=sold_quantity&order=desc&limit=8`
      );
      setTopSellingProducts(topSellingResponse?.data?.data);

      // Fetch top 8 products by average rating
      const highlyRatedResponse = await axios.get(
        `http://localhost:8000/api/product/criteria?sortBy=average_star&order=desc&limit=8`
      );
      setHighlyRatedProducts(highlyRatedResponse?.data?.data);
    } catch (error) {
      console.log("Error fetching top products:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
      toast.success("Đã thêm sản phẩm vào giỏ hàng thành công!");
      fetchCartItems(userId);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
    }
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
      <div className="d-flex align-items-center mx-5">
        <img
          src={Imgnohu}
          alt=""
          style={{ width: "100px", marginRight: "5px" }} // Adjusted margin for spacing
        />
        <span style={{ fontWeight: "bold", fontSize: "30px" }}>
          Sản phẩm bán chạy nhất
        </span>
      </div>
      <div className="container">
        <div className="row">
          {topSellingProducts.slice(0, 8).map((product) => (
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
                </p>{" "}
                <span style={{ fontSize: "15px", color: "#544e4ed4" }}>
                  {" "}
                  Đã bán ({product.sold_quantity})
                </span>
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
                      onClick={() => {
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
      </div>

      <div className="d-flex align-items-center mx-5">
        <img
          src={ImgReview}
          alt=""
          style={{ width: "100px", marginRight: "5px" }} // Adjusted margin for spacing
        />
        <span style={{ fontWeight: "bold", fontSize: "30px" }}>
          Sản phẩm được đánh giá cao
        </span>
      </div>
      <div className="container">
        <div className="row">
          {highlyRatedProducts.slice(0, 8).map((product) => (
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
                <span style={{ fontSize: "15px" }}>
                  {" "}
                  ({product.average_star}){" "}
                  <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
                </span>
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
                      onClick={() => {
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
      </div>

      <Footer />
      <ToastContainer />
    </>
  );
};

export default HomePage;
