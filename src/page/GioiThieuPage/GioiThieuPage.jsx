import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";
import { ToastContainer, toast } from "react-toastify";
import banner3 from "../../assets/img/banner_3.jpg";
import banner4 from "../../assets/img/banner_4.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";

const GioiThieuPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      fetchCartItems(userInfo?._id);
    }
  }, []);

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

  return (
    <div className="container">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartItemCount={cartItems.length}
      />
      <HeadNavNoBanNer />

      <div className="text-center">
        <span style={{ fontSize: "40px", color: "red", fontWeight: "inherit" }}>
          GIỚI THIỆU VỀ CHÚNG TÔI!
        </span>
      </div>
      <p>GIẢI PHÁP KINH DOANH HIỆU QUẢ GAME-NET</p>
      <p>
        Công ty TNHH Tin Học Ngôi Sao Lớn được thành lập vào năm 2013, là Công
        ty chuyên kinh doanh, phân phối Sỉ & Lẻ ngành hàng Máy tính, dịch vụ
        công nghệ thông tin, cung cấp dịch vụ tư vấn giải pháp công nghệ tối ưu
        và các dịch vụ khác liên quan đến máy tính trên toàn quốc.
      </p>
      <p>
        Với hơn 10 năm kinh nghiệm trong lĩnh vực kinh doanh NET , Tin Học Ngôi
        Sao đã cho ra đời hàng ngàn Gaming House chất lượng đến từ khắp mọi nơi
        nhằm đem lại 1 sân chơi eSport đúng nghĩa cho cộng đồng Gamer Việt Nam.
      </p>

      <span>
        Và đến với Tin Học Ngôi Sao , những Ưu Đãi Đặc Biệt là điều mà anh em
        không nên bỏ qua :
      </span>
      <ul>
        <li>
          Miễn Phí Thiết Kế 3D với những Thiết Kế Chuyên Nghiệp và Đẹp Mắt nhất
        </li>
        <li>
          {" "}
          Miễn Phí Quảng Cáo và PR trên tất cả các kênh Online thuộc hệ thống
          Tin Học Ngôi Sao
        </li>
        <li>
          {" "}
          Các giải đấu lớn được tổ chức theo Tháng , Quý , Năm nhằm nâng cao
          chất lượng dịch vụ cho hệ thống Gaming House của khách hàng
        </li>
        <li>
          {" "}
          Được cung cấp chuẩn Linh Kiện chất lượng đi kèm chính sách giá tốt
          nhất thị trường
        </li>
      </ul>
      <div className="row">
        <div className="col-6">
          <img
            src={banner3}
            className="img-fluid px-2"
            style={{ borderRadius: "30px" }}
            alt=""
          />
        </div>
        <div className="col-6">
          <img
            src={banner4}
            className="img-fluid px-2"
            style={{ borderRadius: "30px" }}
            alt=""
          />
        </div>
      </div>
      <div className="text-center mt-4">
        <span style={{ fontSize: "30px", color: "blue" }} className=" px-2">
          CHÀO MỪNG BẠN ĐẾN VỚI CHÚNG TÔI{" "}
          <FontAwesomeIcon
            icon={faHandHoldingHeart}
            style={{ color: "#256fef" }}
          />
        </span>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default GioiThieuPage;
