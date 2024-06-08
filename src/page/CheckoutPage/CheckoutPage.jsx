import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCartItems = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo && userInfo._id) {
        const response = await axios.get(
          `http://localhost:8000/api/cart/${userInfo._id}`
        );
        setCartItems(response.data.data.items);
        const total = response.data.data.items.reduce((total, product) => {
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

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUserId(userInfo._id);
    }
    fetchCartItems();
  }, []);

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
        <p className="fs-1">Thông tin đơn hàng</p>
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
            <div className="d-flex justify-content-between mt-4">
              <div>
                <button
                  onClick={handleContinueShopping}
                  className="btn-back-allProducts"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
              <div>
                <button onClick={payment} className="btn-Payment">
                  khi giao hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default CheckoutPage;
