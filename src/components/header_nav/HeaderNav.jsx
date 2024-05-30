import React from "react";
import "./HeaderNav.css";
import HeaderNavLeft from "../HeaderNavLeft/HeaderNavLeft";
import HeaderNavRight from "../HeaderNavRight/HeaderNavRight";

const HeaderNav = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-3 nav-left">
          <HeaderNavLeft />
        </div>
        <div className="col-9  nav-right  ">
          <HeaderNavRight />
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;
