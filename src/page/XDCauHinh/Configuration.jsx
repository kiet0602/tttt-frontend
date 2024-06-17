import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";
import axios from "axios";
import Img1 from "../../assets/img/1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRotate } from "@fortawesome/free-solid-svg-icons";

const Configuration = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [id, setId] = useState(""); // Khởi tạo state id

  const fetchCartItems = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/cart/${userId}`
      );
      setCartItems(response?.data?.data?.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo._id) {
      fetchCartItems(userInfo._id);
    }
  }, [id, searchTerm]); // Thêm id và searchTerm vào dependency array để useEffect được gọi lại khi có thay đổi

  return (
    <>
      <div className="container">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          cartItemCount={cartItems.length}
        />

        <HeadNavNoBanNer />

        <div className="d-flex justify-content-between">
          <div
            style={{
              background: "red",
              padding: " 10px",
              borderRadius: "10px",
            }}
          >
            <FontAwesomeIcon icon={faRotate} style={{ color: "#ffffff" }} />
            <span style={{ color: "white", cursor: "pointer" }}>
              {" "}
              Xây dựng lại
            </span>
          </div>
          <div>
            <span>Tiền tạm tính 0đ</span>
          </div>
        </div>

        <div className="row m-4">
          <div
            className="col-2"
            style={{
              borderRight: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            <span>1.Chọn main boarch</span>
          </div>
          <div
            className="col-10 py-2"
            style={{ borderBottom: "1px solid black" }}
          >
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              style={{
                width: "100px",
                borderRadius: "10px",
                background: "red",
                color: "white",
              }}
            >
              <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />
              Chọn
            </button>
            {/*   <div className="d-flex">
            <div>
              <img style={{ width: "150px" }} src={Img1} alt="" />
            </div>
            <div className="text-center">
              <p>Tên</p>
              <p>Mã</p>
              <p>Giá</p>
              <input type="number" /> <button>Xóa</button>
            </div>
          </div> */}
          </div>
        </div>
        <div className="row m-4">
          <div
            className="col-2"
            style={{
              borderRight: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            <span>1.Chọn main boarch</span>
          </div>
          <div
            className="col-10 py-2"
            style={{ borderBottom: "1px solid black" }}
          >
            {/*     <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              style={{
                width: "100px",
                borderRadius: "10px",
                background: "red",
                color: "white",
              }}
            >
              <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />
              Chọn
            </button> */}
            <div className="d-flex">
              <div>
                <img style={{ width: "150px" }} src={Img1} alt="" />
              </div>
              <div className="text-start">
                <p style={{ fontWeight: "bold" }}>LapTop</p>
                <p>ID:3247832947234</p>
                <p style={{ color: "red" }}>300,000,000d</p>
                <input
                  className="text-center"
                  style={{ width: "100px", borderRadius: "10px" }}
                  type="Number"
                  value={0}
                />{" "}
                <p className="my-1">
                  {" "}
                  <button
                    style={{
                      width: "100px",
                      borderRadius: "10px",
                      background: "red",
                      color: "white",
                    }}
                  >
                    Xóa
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <div>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Chọn linh kiện!
                  </h1>
                  {/*   <div>
                    <input type="text" placeholder="Bạn muốn tìm gì ?" />
                  </div> */}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <div
                    className="d-flex my-3 "
                    style={{ borderBottom: "1px solid black" }}
                  >
                    <div className="py-2">
                      {" "}
                      <img style={{ width: "150px" }} src={Img1} alt="" />
                    </div>
                    <div className="py-2">
                      <p style={{ fontWeight: "bold" }}>Laptop</p>
                      <p style={{ color: "red" }}>300.000.000d</p>
                      <p>ID: 3423432432</p>
                      <button
                        className=""
                        style={{
                          width: "100px",
                          borderRadius: "10px",
                          background: "red",
                          color: "white",
                        }}
                      >
                        Chọn
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-body">
                  <div
                    className="d-flex my-3 "
                    style={{ borderBottom: "1px solid black" }}
                  >
                    <div className="py-2">
                      {" "}
                      <img style={{ width: "150px" }} src={Img1} alt="" />
                    </div>
                    <div className="py-2">
                      <p>Tên</p>
                      <p>Giá</p>
                      <p>Mã sản phẩm</p>
                      <button
                        className=""
                        style={{
                          width: "100px",
                          borderRadius: "10px",
                          background: "red",
                          color: "white",
                        }}
                      >
                        Chọn
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-body">
                  <div
                    className="d-flex"
                    style={{ borderBottom: "1px solid black" }}
                  >
                    <div className="py-1">
                      {" "}
                      <img style={{ width: "150px" }} src={Img1} alt="" />
                    </div>
                    <div className="py-1">
                      <p>Tên</p>
                      <p>Giá</p>
                      <p>Mã sản phẩm</p>
                      <button
                        className=""
                        style={{
                          width: "100px",
                          borderRadius: "10px",
                          background: "red",
                          color: "white",
                        }}
                      >
                        Chọn
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-footer"></div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Configuration;
