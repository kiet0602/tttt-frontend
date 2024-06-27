import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";
import { ToastContainer, toast } from "react-toastify";
import imgLogo from "../../assets/img/PNG-Van-Phong-Lam-Viec041.png";
import "./ContactPage.css";
import {
  faEnvelope,
  faHouse,
  faMessage,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import banner3 from "../../assets/img/banner_3.jpg";
import banner4 from "../../assets/img/banner_4.jpg";

const ContactPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [conversationId, setConversationId] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [userId, setUserId] = useState("");

  const handleSendMessage = async () => {
    try {
      if (!userId) {
        alert(
          "Bạn cần phải đăng nhập để có thể gửi nội dung liên hệ với chúng tôi!"
        );
      }
      const response = await axios.post(
        "http://localhost:8000/api/conversation",
        {
          conversationId: null,
          senderId: userId,
          messageContent: messageContent,
        }
      );
      console.log("Message sent:", response.data);
      toast.success("Nội dung của bạn đã được gửi");

      setMessageContent("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      fetchCartItems(userInfo?._id);
      setUserId(userInfo?._id);
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
      <div className="text-center my-4 ">
        <span style={{ fontSize: "40px", color: "red" }}>
          THÔNG TIN LIÊN HỆ TTTT-SHOP
        </span>
      </div>
      <hr style={{ width: "500px", margin: "0 auto" }} />
      <div className="text-center">
        <p style={{ fontSize: "15px", paddingTop: "20px" }}>
          Mọi vấn đề thắc mắc hay cần tư vấn thiết kế lắp đặt, hãy liên hệ với
          chúng tôi
        </p>
        <span style={{ fontSize: "15px" }}>
          Đội ngũ chăm sóc khách hàng 24/7 luôn hỗ trợ nhiệt tình giúp khách
          hàng tìm ra các giải pháp và tư vấn set up mô hình Cyber Net.
        </span>
      </div>
      <div className="row mt-4">
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
      <div className="row my-5 ms-5">
        <div className="col-6 d-flex align-items-center text-center">
          <div className="col-2 d-flex align-items-center">
            <Link to="/" className="text-logo2 d-flex align-items-center">
              <img className="imgLogo2" src={imgLogo} alt="Logo" />S
              <span>hop</span>
            </Link>
          </div>
        </div>
        <div className="col-6">
          <div className="my-5">
            <span className="fw-bold ">
              <FontAwesomeIcon
                className="px-1"
                icon={faHouse}
                style={{ color: "#e7043c" }}
              />
              Địa chỉ:
            </span>
            <span> 11 Phan Đình Phùng, Tân An, Ninh Kiều, Cần Thơ 92000</span>
          </div>
          <div className="my-5">
            <span className="fw-bold">
              <FontAwesomeIcon
                className="px-1"
                icon={faPhone}
                style={{ color: "#e7043c" }}
              />
              Tổng tài hỗ trợ:
            </span>
            Điện thoại: 0123456789
          </div>
          <div className="my-5">
            <span className="fw-bold">
              <FontAwesomeIcon
                className="px-1"
                icon={faEnvelope}
                style={{ color: "#e7043c" }}
              />
              Email:
            </span>
            example@gmail.com
          </div>
        </div>
      </div>
      <div
        className="map-container my-5 "
        style={{ border: "1px solid black", borderRadius: "20px" }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.786973250476!2d105.78477097468608!3d10.034430190072717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a062a1859790c1%3A0xfc202c352c71386a!2zVmnDqsyDbiB0aMO0bmcgQ8OizIBuIFRoxqEgKFZOUFQgQ2FuIFRobyk!5e0!3m2!1svi!2s!4v1719395753498!5m2!1svi!2s"
          width="100%"
          height="450"
          style={{ borderRadius: "20px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div>
        <div className="mb-3  text-center">
          <label
            style={{ fontSize: "30px" }}
            htmlFor="exampleFormControlTextarea1"
            className="form-label"
          >
            Nội dung liên hệ bạn muốn gửi đến chúng tôi?
          </label>
          <textarea
            placeholder="Chúng tôi cảm ơn...!"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={5}
            defaultValue={""}
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
        </div>
        <div className="text-end">
          <button
            onClick={handleSendMessage}
            style={{
              borderRadius: "20px",
              background: "red",
              padding: "5px",
              width: "200px",
              color: "white",
            }}
          >
            <FontAwesomeIcon icon={faMessage} style={{ color: "#f8f7f7" }} />{" "}
            Gửi tin nhắn
          </button>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ContactPage;
