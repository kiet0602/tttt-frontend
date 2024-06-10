import React, { useState } from "react";
import "./ListCard.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ListCard = ({ products }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

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
    <div className="container">
      <div className="row">
        {products.map((product) => (
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
  );
};

export default ListCard;
