import React, { useEffect, useState } from "react";
import "./BlockTitle.css";
import { Link } from "react-router-dom";
import axios from "axios";

const BlockTitle = ({ title }) => {
  return (
    <div className="container">
      <div className="d-flex justify-content-between box-title text-center ">
        <span className=" text-end   text-title-regorogy">{title}</span>
        <div className="text-title">
          <Link className="text-Link-tittle">
            <p className="">Xem tất cả</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlockTitle;
