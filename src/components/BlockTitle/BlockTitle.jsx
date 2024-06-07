import React, { useEffect, useState } from "react";
import "./BlockTitle.css";

const BlockTitle = ({ title }) => {
  return (
    <div className="container">
      <div className="d-flex justify-content-between box-title text-center ">
        <span className=" text-end   text-title-regorogy">{title}</span>
      </div>
    </div>
  );
};

export default BlockTitle;
