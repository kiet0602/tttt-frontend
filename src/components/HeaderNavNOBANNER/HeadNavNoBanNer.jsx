import React from "react";
import HeaderNavLeft from "../HeaderNavLeft/HeaderNavLeft";
import HeaderNavRightNoBANNER from "../HeaderNavRight-noBANNER/HeaderNavRightNoBANNER";
import "./HeaderNavNoBanNer.css";
const HeadNavNoBanNer = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-3 nav-left">
          <HeaderNavLeft />
        </div>
        <div className="col-9  nav-right  ">
          <HeaderNavRightNoBANNER />
        </div>
      </div>
    </div>
  );
};

export default HeadNavNoBanNer;
