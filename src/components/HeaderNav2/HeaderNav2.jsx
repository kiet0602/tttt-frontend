import React from "react";
import "./HeaderNav2.css";
import HeaderNavRight from "../HeaderNavRight/HeaderNavRight";
import HeaderNavLeft2 from "../HeaderNavLeft2/HeaderNavLeft2";

const HeaderNav2 = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-3 nav-left">
          <HeaderNavLeft2 />
        </div>
        <div className="col-9  nav-right  ">
          <HeaderNavRight />
        </div>
      </div>
    </div>
  );
};

export default HeaderNav2;
