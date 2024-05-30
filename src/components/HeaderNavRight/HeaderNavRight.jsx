import React from "react";
import "./HeaderNavRight.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imgSilde from "../../assets/img/slide-fs-f2_2d76761b7757416ea9e449cdad9b44b1.webp";
import imgBanner1 from "../../assets/img/banner_right_1.webp";
import imgBanner2 from "../../assets/img/banner_right_2.webp";

import {
  faHouse,
  faPhoneVolume,
  faInfo,
  faNewspaper,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

const HeaderNavRight = () => {
  return (
    <div className="nav-right">
      <div className="mt-1  box-nav-right justify-content-between">
        <ul className="d-flex justify-content-between list-nav-right align-items-center  ">
          <li>
            <Link className="text-Link-navRight">
              <FontAwesomeIcon className="pe-1" icon={faHouse} />
              Trang chủ
            </Link>
          </li>
          <li>
            <Link className="text-Link-navRight">
              <FontAwesomeIcon className="pe-1" icon={faPhoneVolume} />
              Liên hệ
            </Link>
          </li>
          <li>
            <Link className="text-Link-navRight">
              <FontAwesomeIcon className="pe-1" icon={faInfo} />
              Giới thiệu
            </Link>
          </li>
          <li>
            <Link className="text-Link-navRight">
              <FontAwesomeIcon className="pe-1" icon={faNewspaper} />
              Tin tức
            </Link>
          </li>
          <li>
            <Link className="text-Link-navRight">
              <FontAwesomeIcon className="pe-1" icon={faUserShield} />
              Chính sách bảo hành
            </Link>
          </li>
        </ul>
      </div>
      <div className="row">
        <div className="col-8 box-slide">
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <Link>
                  <img
                    src={imgSilde}
                    className="d-block w-100 img-slide"
                    alt="..."
                  />
                </Link>
              </div>
              <div className="carousel-item">
                <Link>
                  <img
                    src={imgSilde}
                    className="d-block w-100 img-slide"
                    alt="..."
                  />
                </Link>
              </div>
              <div className="carousel-item">
                <Link>
                  <img
                    src={imgSilde}
                    className="d-block w-100 img-slide"
                    alt="..."
                  />
                </Link>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="col-4 box-banner ">
          <div className="pb-1">
            <Link>
              <img src={imgBanner1} className="img-banner" alt="" />
            </Link>
          </div>
          <div>
            <Link>
              <img src={imgBanner2} className="img-banner" alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderNavRight;
