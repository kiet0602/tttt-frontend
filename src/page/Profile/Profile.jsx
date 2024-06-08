import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [allOrderUser, setAllOrderUser] = useState([]);

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

      setAllOrderUser(res.data.data);
      console.log(res.data.data);
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

  return (
    <Layout>
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
                />{" "}
                <br />
                <p className="user-profile">
                  Tên khách hàng:{" "}
                  <span className="user-name-profile">
                    {" "}
                    {userInfo?.username}{" "}
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
              </div>
              <div className="table-responsive">
                <table
                  className="table table-bordered t "
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
                    {allOrderUser?.length > 0 ? (
                      allOrderUser.map((order) => (
                        <tr key={order._id} className="text-center">
                          <td>{order._id}</td>
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
                            {order.total_price.toLocaleString()}{" "}
                          </td>

                          <td>{order.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No orders found.
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
    </Layout>
  );
};

export default Profile;
