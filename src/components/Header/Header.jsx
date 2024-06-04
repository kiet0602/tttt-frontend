/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imgLogo from "../../assets/img/PNG-Van-Phong-Lam-Viec041.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = ({ searchTerm, setSearchTerm }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUserInfo(userInfo);
    }
  }, []);
  return (
    <div className="container-lg mt-4">
      <div className="row align-items-center justify-content-between">
        <div className="col-2 text-center box-logo">
          <Link to={"/"} className="text-logo">
            <img className="imgLogo" src={imgLogo} alt="" />S
            <span className="">hop</span>
          </Link>
        </div>
        <div className="col-7 text-end">
          <div>
            <form className="formSearch">
              <input
                className="inputSearch"
                type="search"
                placeholder="Bạn đang tìm gì?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="buttonSearch" type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                Tìm kiếm
              </button>
            </form>
          </div>
        </div>
        <div className="col-3 d-flex justify-content-evenly ">
          {userInfo ? (
            <>
              <div className="d-flex align-items-center">
                <Link
                  to="/profile"
                  className="text-link-header d-flex align-items-center"
                >
                  <img
                    src={
                      userInfo.avatar.startsWith("https")
                        ? `${userInfo.avatar}`
                        : `http://localhost:8000/${userInfo.avatar}`
                    }
                    className="rounded-circle me-2"
                    style={{ width: "30px", height: "30px" }}
                  />
                  {userInfo.username}
                </Link>
              </div>
              <div className="relative">
                <Link to="/cart" className="text-link-header">
                  <FontAwesomeIcon
                    className="text-dark"
                    icon={faCartShopping}
                  />
                  (1) Giỏ hàng
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="">
                <Link to="/login" className="text-link-header">
                  <FontAwesomeIcon className="text-dark" icon={faUser} /> Đăng
                  nhập
                </Link>
              </div>
              <div className="relative">
                <Link to="/cart" className="text-link-header">
                  <FontAwesomeIcon
                    className="text-dark"
                    icon={faCartShopping}
                  />
                  (1) Giỏ hàng
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
