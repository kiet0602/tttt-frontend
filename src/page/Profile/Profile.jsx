import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUserInfo(userInfo);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userId");
    navigate(`/login`);
  };

  return (
    <Layout>
      {userInfo ? (
        <div className="container mt-5">
          <div className="box-info col-6">
            <div className="">
              <img
                className="img-avatar-profile"
                src={`http://localhost:8000/${userInfo.avatar}`}
              />{" "}
              <br />
              <p className="user-profile">
                Tên khách hàng:{" "}
                <span className="user-name-profile"> {userInfo.username} </span>
              </p>
            </div>
            <div>
              <p className="email">
                Gmail khách hàng:
                <span className="email-profile"> {userInfo.email}</span>
              </p>
              <p className="address">
                Địa chỉ khách hàng:
                <span className="address-profile"> {userInfo.address}</span>
              </p>
            </div>
            <div className="text-center">
              <button onClick={handleLogout} className="btn-logout">
                Đăng xuất
              </button>
            </div>
          </div>
          <div className="col-6"></div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </Layout>
  );
};

export default Profile;
