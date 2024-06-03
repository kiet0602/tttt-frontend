import React from "react";
import "./HeaderNavRightNoBANNER.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHouse,
  faPhoneVolume,
  faInfo,
  faNewspaper,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

const HeaderNavRightNoBANNER = () => {
  return (
    <div className="nav-right">
      <div className="mt-1  box-nav-right justify-content-between">
        <ul className="d-flex justify-content-between list-nav-right align-items-center  ">
          <li>
            <Link to={"/"} className="text-Link-navRight">
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
    </div>
  );
};

export default HeaderNavRightNoBANNER;
