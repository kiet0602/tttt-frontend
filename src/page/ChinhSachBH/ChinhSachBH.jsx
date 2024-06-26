import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";

const ChinhSachBH = () => {
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
          QUY ĐỊNH VỀ CHÍNH SÁCH BẢO HÀNH!
        </span>
      </div>

      {/* Warranty Policy Sections */}
      <div className="warranty-section">
        <h3>Chính Sách Bảo Hành Thiết Bị Điện Tử</h3>

        <p>
          <strong>1. Thời Gian Bảo Hành:</strong> Tất cả các thiết bị điện tử do
          Công ty TNHH Tin Học Ngôi Sao Lớn cung cấp đều có thời gian bảo hành
          từ 12 tháng đến 36 tháng tùy theo loại sản phẩm. Trong suốt thời gian
          bảo hành, nếu sản phẩm gặp bất kỳ sự cố nào do lỗi của nhà sản xuất,
          khách hàng sẽ được sửa chữa hoặc thay thế miễn phí.
        </p>

        <p>
          <strong>2. Điều Kiện Bảo Hành:</strong> Chúng tôi chỉ chấp nhận bảo
          hành cho các sản phẩm còn nguyên tem bảo hành, không có dấu hiệu can
          thiệp bởi bên thứ ba. Các sản phẩm bị hư hỏng do va đập, vào nước,
          hoặc sử dụng sai cách sẽ không được bảo hành.
        </p>

        <p>
          <strong>3. Quy Trình Bảo Hành:</strong> Khi có nhu cầu bảo hành, khách
          hàng vui lòng liên hệ với bộ phận chăm sóc khách hàng của chúng tôi
          qua số điện thoại 0909 235 286 hoặc email tinhocngoisaolon@gmail.com
          để được hướng dẫn chi tiết về quy trình gửi sản phẩm bảo hành. Chúng
          tôi cam kết xử lý yêu cầu bảo hành trong vòng 7 ngày làm việc kể từ
          khi nhận được sản phẩm.
        </p>

        <p>
          <strong>4. Dịch Vụ Hỗ Trợ Khách Hàng:</strong> Đội ngũ kỹ thuật viên
          chuyên nghiệp của chúng tôi luôn sẵn sàng hỗ trợ khách hàng 24/7. Nếu
          bạn gặp bất kỳ vấn đề nào liên quan đến sản phẩm, vui lòng liên hệ với
          chúng tôi để được tư vấn và hỗ trợ kịp thời.
        </p>

        <p>
          <strong>5. Chính Sách Đổi Trả:</strong> Trong vòng 7 ngày kể từ ngày
          mua hàng, nếu sản phẩm gặp lỗi kỹ thuật không thể khắc phục, khách
          hàng có thể yêu cầu đổi sản phẩm mới hoặc hoàn tiền. Quy trình đổi trả
          sẽ được thực hiện nhanh chóng và thuận tiện để đảm bảo quyền lợi tối
          đa cho khách hàng.
        </p>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ChinhSachBH;
