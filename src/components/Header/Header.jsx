/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imgLogo from "../../assets/img/PNG-Van-Phong-Lam-Viec041.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import axios from "axios";

const Header = ({ searchTerm, setSearchTerm, cartItemCount }) => {
  const [products, setProducts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userInfoFromStorage = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfoFromStorage) {
      setUserInfo(userInfoFromStorage);
      const fetchCartItems = async (userId) => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/cart/${userId}`
          );
          setProducts(response.data.data.items);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };
      fetchCartItems(userInfoFromStorage._id);
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle the search submit logic here, if needed
  };

  return (
    <div className="container-lg mt-4">
      <div className="row align-items-center justify-content-between">
        <div className="col-2 text-center box-logo">
          <Link to="/" className="text-logo">
            <img className="imgLogo" src={imgLogo} alt="Logo" />S
            <span>hop</span>
          </Link>
        </div>
        <div className="col-6 text-end">
          <form className="formSearch" onSubmit={handleSearchSubmit}>
            <input
              className="inputSearch"
              type="search"
              placeholder="Bạn đang tìm gì?"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="buttonSearch" type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              Tìm kiếm
            </button>
          </form>
        </div>
        <div className="col-4 d-flex justify-content-evenly">
          {userInfo ? (
            <>
              <div className="d-flex align-items-center">
                <Link
                  to="/profile"
                  className="text-link-header d-flex align-items-center"
                >
                  <img
                    src={
                      userInfo.avatar?.startsWith("https")
                        ? userInfo.avatar
                        : userInfo.avatar
                        ? `http://localhost:8000/${userInfo.avatar}`
                        : "https://i.pinimg.com/736x/b6/bb/1f/b6bb1f98d48a1402a1b33c6a6da0c276.jpg" // Default fallback image URL
                    }
                    className="rounded-circle "
                    style={{ width: "30px", height: "30px" }}
                    alt="User Avatar"
                  />
                  <div style={{ width: "200px", marginLeft: "20px" }}>
                    {" "}
                    {userInfo.username}
                  </div>
                </Link>
              </div>
              <div className="relative">
                <Link to="/cart" className="text-link-header">
                  <FontAwesomeIcon
                    className="text-dark"
                    icon={faCartShopping}
                  />
                  ({cartItemCount}) Giỏ hàng
                </Link>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link to="/login" className="text-link-header">
                  <FontAwesomeIcon icon={faUser} style={{ color: "#0c5fed" }} />
                  Đăng nhập
                </Link>
              </div>
              <div className="relative">
                <Link to="/register" className="text-link-header">
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    style={{ color: "#0c5fed" }}
                  />
                  Đăng kí
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
