import React, { useEffect, useState } from "react";
import "./ListCard.css";
import imgPC from "../../assets/img/pc.png";

const ListCard = ({ products }) => {
  return (
    <div className="container">
      <div className="row">
        {products.slice(0, 4).map((product) => (
          <div className="col-3 box-product mt-1" key={product.id}>
            <div className="text-center">
              <img className="img-fluid" src={imgPC} alt="" />
              <span className="text-center">{product.name}</span>
              <p>{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCard;
