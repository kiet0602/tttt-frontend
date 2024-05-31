import React, { useEffect, useState } from "react";
import "./BlockTitle.css";
import { Link } from "react-router-dom";
import axios from "axios";

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
