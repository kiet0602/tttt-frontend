import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [allOrderUser, setAllOrderUser] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  useEffect(() => {
    // Gọi fetchCartItems khi component được render
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
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUserInfo(userInfo);
    }
  }, []);

  const getAllproductsOrder = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/order/user/${userInfo?._id}`
      );

      setAllOrderUser(res?.data?.data);
      setFilteredOrders(res?.data?.data);
      console.log(res?.data?.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (userInfo?._id) {
      getAllproductsOrder();
    }
  }, [userInfo]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userId");
    navigate(`/login`);
  };

  const filterOrdersByDate = () => {
    const selected = new Date(selectedDate);
    const filtered = allOrderUser.filter((order) => {
      const orderDate = new Date(order.order_date);
      return (
        orderDate.getFullYear() === selected.getFullYear() &&
        orderDate.getMonth() === selected.getMonth() &&
        orderDate.getDate() === selected.getDate()
      );
    });
    setFilteredOrders(filtered);
  };

  useEffect(() => {
    if (selectedDate) {
      filterOrdersByDate();
    } else {
      setFilteredOrders(allOrderUser);
    }
  }, [selectedDate]);

  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartItemCount={cartItems.length}
      />
      <HeadNavNoBanNer />
      {userInfo ? (
        <div className="container mt-5">
          <div className="row">
            <div className="box-info col-3">
              <div className="">
                <img
                  className="img-avatar-profile"
                  src={
                    userInfo?.avatar?.startsWith("https")
                      ? userInfo?.avatar
                      : `http://localhost:8000/${userInfo?.avatar}`
                  }
                  alt="User Avatar"
                />
                <br />
                <p className="user-profile">
                  Tên khách hàng:
                  <span className="user-name-profile">
                    {userInfo?.username}
                  </span>
                </p>
              </div>
              <div>
                <p className="email">
                  Gmail khách hàng:
                  <span className="email-profile"> {userInfo?.email}</span>
                </p>
                <p className="address">
                  Địa chỉ khách hàng:
                  <span className="address-profile"> {userInfo?.address}</span>
                </p>
              </div>
              <div className="text-center">
                <button onClick={handleLogout} className="btn-logout">
                  Đăng xuất
                </button>
              </div>
            </div>

            <div className="col-9">
              <div>
                <h4>LỊCH SỬ MUA HÀNG</h4>
                <div className="d-flex mb-3">
                  <input
                    type="date"
                    style={{ width: "23%" }}
                    className="form-control me-2"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                  <button
                    onClick={filterOrdersByDate}
                    className="btn btn-primary"
                  >
                    Tìm kiếm
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  style={{
                    borderCollapse: "separate",
                    borderRadius: "30px",
                    overflow: "hidden",
                  }}
                >
                  <thead>
                    <tr>
                      <th>MÃ ĐƠN HÀNG</th>
                      <th>NGÀY ĐẶT HÀNG</th>
                      <th>TỔNG TIỀN</th>
                      <th>TRẠNG THÁI ĐƠN HÀNG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders?.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order._id} className="text-center">
                          <td
                            className="IDhoverOder"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => handleOrderClick(order)}
                            style={{ cursor: "pointer" }}
                          >
                            {order._id}
                          </td>
                          <td>
                            {new Date(order.order_date).toLocaleDateString()}
                          </td>
                          <td
                            className=""
                            style={{
                              color: "red",
                              fontSize: "20px",
                              fontWeight: "bolder",
                            }}
                          >
                            {order.total_price.toLocaleString()}
                          </td>
                          <td>{order.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          Không tìm thấy đơn hàng nào.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Order Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedOrder && selectedOrder.orderDetails && (
                <>
                  {selectedOrder.orderDetails.map((detail) => (
                    <div key={detail._id}>
                      <div className="d-flex">
                        <div className="pe-4">
                          {" "}
                          <img
                            src={`http://localhost:8000/${detail.product_image}`}
                            alt=""
                            style={{ width: "100px", height: "100px" }}
                          />
                        </div>
                        <div>
                          {" "}
                          <p>Product Name: {detail.product_name}</p>
                        </div>
                      </div>

                      <p>Quantity: {detail.quantity}</p>
                      <p>Unit Price: {detail.unit_price.toLocaleString()}</p>
                      <hr />
                    </div>
                  ))}
                  <p>
                    Order Date:{" "}
                    {new Date(selectedOrder.order_date).toLocaleDateString()}
                  </p>
                  <p>Status: {selectedOrder.status}</p>
                  <p>
                    Total Price: {selectedOrder.total_price.toLocaleString()}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
