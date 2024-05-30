import React from "react";
import "./HeaderNavLeft.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const HeaderNavLeft = () => {
  return (
    <div className="nav-left">
      <div className="text-center py-1 box-nav-left ">
        <FontAwesomeIcon className="px-2" icon={faList} />
        <span>DANH MỤC SẢN PHẨM</span>
      </div>
      <div className="box-list-nav-left">
        <ul className="box-nav-left2 list-nav-left  ">
          <div className="text-center py-1 box-item-li-navLeft ">
            <li>
              <Link className="text-link-navLeft">SSD-HDD-USB</Link>
            </li>
          </div>
          <div className="text-center py-1 box-item-li-navLeft ">
            <li>
              <Link className="text-link-navLeft">LAP TOP</Link>
            </li>
          </div>
          <div className="text-center py-1 box-item-li-navLeft ">
            <li>
              <Link className="text-link-navLeft">MÀN HÌNH</Link>
            </li>
          </div>
          <div className="text-center py-1 box-item-li-navLeft ">
            <li>
              <Link className="text-link-navLeft">MÁY IN</Link>
            </li>
          </div>
          <div className="text-center py-1 box-item-li-navLeft ">
            <li>
              <Link className="text-link-navLeft">THIẾT BỊ MẠNG</Link>
            </li>
          </div>
          <div className="text-center py-1 box-item-li-navLeft ">
            <li>
              <Link className="text-link-navLeft">THIẾT BỊ ÂM THANH</Link>
            </li>
          </div>
          <div className="text-center py-1 box-item-li-navLeft ">
            <li>
              <Link className="text-link-navLeft">CAMERA</Link>
            </li>
          </div>
          <div className="text-center py-1 box-item-li-navLeft ">
            <li>
              <Link className="text-link-navLeft">WEBCAM</Link>
            </li>
          </div>
          <div className="text-center py-1 box-item-li-navLeft ">
            <li>
              <Link className="text-link-navLeft">BÀN PHÍM</Link>
            </li>
          </div>
          <div className="text-center py-1 box-item-li-navLeft ">
            <li>
              <Link className="text-link-navLeft">CHUỘT</Link>
            </li>
          </div>
          <div className="text-center py-1 box-item-li-navLeft ">
            <li>
              <Link className="text-link-navLeft">TAI NGHE</Link>
            </li>
          </div>
          <div className="text-center py-1 box-item-li-navLeft ">
            <li>
              <Link className="text-link-navLeft">PC</Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default HeaderNavLeft;
