import React, { useEffect, useState } from "react";
import "./ListCard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ListCard = ({ products }) => {
  const navigate = useNavigate();

  const addCart = (productId) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userId = userInfo._id;
    const res = axios.post("http://localhost:8000/api/cart", {
      userId,
      productId,
      quantity: 1,
    });
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
                alt=""
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
        ))}
      </div>
    </div>
  );
};

export default ListCard;
