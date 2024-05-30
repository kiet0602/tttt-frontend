import React from "react";
import "./ListCard.css";
import imgPC from "../../assets/img/pc.png";
const ListCard = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-3 box-product mt-1">
          <div className="text-center">
            <img className="img-fluid" src={imgPC} alt="" />
            <span className="text-center">PC gaming</span>
            <p>100.000.000đ</p>
          </div>
        </div>
        <div className="col-3 box-product mt-1">
          <div className="text-center">
            <img className="img-fluid" src={imgPC} alt="" />
            <span className="text-center">PC gaming</span>
            <p>100.000.000đ</p>
          </div>
        </div>
        <div className="col-3 box-product mt-1">
          <div className="text-center">
            <img className="img-fluid" src={imgPC} alt="" />
            <span className="text-center">PC gaming</span>
            <p>100.000.000đ</p>
          </div>
        </div>

        <div className="col-3 box-product mt-1">
          <div className="text-center">
            <img className="img-fluid" src={imgPC} alt="" />
            <span className="text-center">123</span>
            <p>100.000.000đ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
