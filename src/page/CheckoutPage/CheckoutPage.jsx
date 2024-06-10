import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import PayPal from "../../components/PayPal";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userId, setUserId] = useState(null);
  const [userINFO, SetuserINFO] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCartItems = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo && userInfo?._id) {
        const response = await axios.get(
          `http://localhost:8000/api/cart/${userInfo?._id}`
        );
        setCartItems(response?.data?.data?.items);
        const total = response?.data?.data?.items.reduce((total, product) => {
          return total + product.product_id.price * product.quantity;
        }, 0);
        setTotalPrice(total);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  const payment = () => {
    try {
      const res = axios.post("http://localhost:8000/api/order", {
        userId,
        orderFromCart: true,
        orderDetails: [],
      });
      toast.success("Bạn đã đặt hàng thành công!");
      fetchCartItems();
    } catch (error) {}
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    if (userInfo) {
      setUserId(userInfo?._id);
      SetuserINFO(userInfo);
    }
    fetchCartItems();
  }, [userInfo]);

  const handleContinueShopping = () => {
    navigate("/productsAll"); // Navigate to home page
  };

  return (
    <>
      <Header
        cartItemCount={cartItems.length}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <HeadNavNoBanNer />
      <div className="container">
        <p className="fs-4">Thông tin khách hàng:</p>
        {userINFO && (
          <div>
            <p>
              Tên khách hàng:{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                {userINFO.username}
              </span>{" "}
            </p>
            <p>
              Email khách hàng:{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                {userINFO.email}
              </span>{" "}
            </p>
            <p>
              Địa chỉ khách hàng:{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                {userINFO.address}
              </span>{" "}
            </p>
          </div>
        )}
        <p className="fs-4">Thông tin đơn hàng:</p>

        <div className="row">
          <div className="col-8">
            <table
              className="table table-white"
              style={{
                borderCollapse: "separate",
                borderSpacing: 0,
                borderRadius: "30px",
                overflow: "hidden",
              }}
            >
              <thead className="boxx" style={{ textAlign: "center" }}>
                <tr>
                  <th scope="col" style={{ borderTopLeftRadius: "10px" }}>
                    Hình
                  </th>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col" style={{ borderTopRightRadius: "10px" }}>
                    Tổng
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr
                    key={item.product_id._id}
                    style={{
                      textAlign: "center",
                      borderBottomLeftRadius:
                        index === cartItems.length - 1 ? "10px" : 0,
                      borderBottomRightRadius:
                        index === cartItems.length - 1 ? "10px" : 0,
                    }}
                  >
                    <td>
                      <Link to={`/product/${item.product_id._id}`}>
                        <img
                          style={{ width: "100px" }}
                          src={`http://localhost:8000/${item.product_id.image}`}
                          alt={item.product_id.name}
                        />
                      </Link>
                    </td>
                    <td className="nameProducts-cart">
                      {item.product_id.name}
                    </td>
                    <td className="priceProducts-cart">
                      {item.product_id.price.toLocaleString()}đ
                    </td>
                    <td>
                      <span>{item.quantity}</span>
                    </td>
                    <td className="SumPrice-cart">
                      {(item.product_id.price * item.quantity).toLocaleString()}
                      đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-4">
            <div className="d-flex justify-content-between">
              <div>Tổng</div>
              <div className="SumPayment-cart">
                {totalPrice.toLocaleString()} VND
              </div>
            </div>
            <div className=" mt-4 ">
              <div className="">
                <button
                  onClick={handleContinueShopping}
                  className="btn-back-allProducts"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
              <hr />
              <div className="mt-2">
                <p>Thanh toán bằng tiền mặt</p>
                <button onClick={payment} className="btn-PaymentcheckOut fs-6">
                  Thanh toán khi giao hàng
                </button>
              </div>
            </div>
            <p className="mt-3">Thanh toán bằng PayPal</p>
            <PayPal cost={totalPrice ?? 1} handleClickX={payment} />
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default CheckoutPage;
