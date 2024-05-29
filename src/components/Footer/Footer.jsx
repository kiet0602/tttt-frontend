import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import {
  faTruckFast,
  faBox,
  faCreditCard,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="footer py-5">
      <div className="container">
        <div className="row">
          <div className="col-3 d-flex text-center">
            <FontAwesomeIcon
              className="mt-2 fs-3 mx-2 title-service text-dark"
              icon={faTruckFast}
            />
            <div>
              <span className="fw-bold title-service">
                CHÍNH SÁCH GIAO HÀNG
              </span>
              <br />
              <p className="text-footer title-service-small">
                Nhận hàng và thanh toán tại nhà.
              </p>
            </div>
          </div>
          <div className="col-3 d-flex text-center">
            <FontAwesomeIcon
              className="mt-2 fs-3 mx-2 title-service text-dark"
              icon={faBox}
            />
            <div>
              <span className="fw-bold title-service">ĐỔI TRẢ DỄ DÀNG</span>{" "}
              <br />
              <p className="text-footer title-service-small">
                1 đổi 1 trong 7 ngày
              </p>
            </div>
          </div>
          <div className="col-3 d-flex text-center">
            <FontAwesomeIcon
              className="mt-2 fs-3 mx-2 title-service text-dark"
              icon={faCreditCard}
            />
            <div>
              <span className="fw-bold title-service">
                THANH TOÁN THUẬN TIỆN
              </span>{" "}
              <br />
              <p className="text-footer title-service-small">
                Trả tiền mặt, chuyển khoảng, Trả góp 0%
              </p>
            </div>
          </div>
          <div className="col-3 d-flex text-center">
            <FontAwesomeIcon
              className="mt-2 fs-3 mx-2 title-service text-dark"
              icon={faHeadset}
            />
            <div>
              <span className="fw-bold title-service">HỖ TRỢ NHIỆT TÌNH</span>{" "}
              <br />
              <p className="text-footer title-service-small">
                Tư vấn, giải đáp mọi thắc mắc
              </p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-3">
            <div className="fw-bold text-bold-footer">
              <span className="fw-bold">GIỚI THIỆU</span>
            </div>
            <div className="mt-3 ">
              <Link className="text-Link-footer">Về chúng tôi</Link> <br />
              <Link className="text-Link-footer">Tư vấn mua hàng</Link> <br />
              <Link className="text-Link-footer">Tuyển dụng</Link> <br />
            </div>
          </div>
          <div className="col-3">
            <div className="fw-bold text-bold-footer">
              <span className="fw-bold">GIỚI THIỆU</span>
            </div>
            <div className="mt-3 ">
              <Link className="text-Link-footer">Về chúng tôi</Link> <br />
              <Link className="text-Link-footer">Tư vấn mua hàng</Link> <br />
              <Link className="text-Link-footer">Tuyển dụng</Link> <br />
            </div>
          </div>
          <div className="col-3">
            <div className="fw-bold text-bold-footer">
              <span className="fw-bold">GIỚI THIỆU</span>
            </div>
            <div className="mt-3 ">
              <Link className="text-Link-footer">Về chúng tôi</Link> <br />
              <Link className="text-Link-footer">Tư vấn mua hàng</Link> <br />
              <Link className="text-Link-footer">Tuyển dụng</Link> <br />
            </div>
          </div>
          <div className="col-3">
            <div className="fw-bold text-bold-footer">
              <span className="fw-bold">GIỚI THIỆU</span>
            </div>
            <div className="mt-3 ">
              <Link className="text-Link-footer">Về chúng tôi</Link> <br />
              <Link className="text-Link-footer">Tư vấn mua hàng</Link> <br />
              <Link className="text-Link-footer">Tuyển dụng</Link> <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
