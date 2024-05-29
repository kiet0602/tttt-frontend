import React from "react";
import "./RegisterPage.css";
import avatar from "../../../src/assets/img/1.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  /*   const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(""); */

  const [navigate, setNavigate] = useState(false);

  const registerUser = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.post("", {
        username,
        email,
        password,
        address,
      });
      console.log(response.data);
      alert(`Successfully registered`);
    } catch (error) {
      alert(`Registered Fail`);
      setNavigate(true);
    }
  };

  if (navigate) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow box-area">
        <div
          className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
          style={{ background: "#103cbe" }}
        >
          <div className="featured-image mb-3">
            <img src="" className="img-fluid" style={{ width: 250 }} />
          </div>
          <small
            className="text-white text-wrap text-center fs-6"
            style={{
              width: "17rem",
              fontFamily: '"Courier New", Courier, monospace',
            }}
          >
            Chào mừng bạn!
          </small>
        </div>

        <div className="col-md-6 right-box">
          <div className="row align-items-center">
            <div className="header-text mb-4">
              <h2>Chào bạn!</h2>
              <p>Hãy là một thành viên mới của chúng tôi.</p>
            </div>
            <form onSubmit={registerUser}>
              <div className="input-group mb-1">
                <input
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Tên người dùng"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-group mb-1">
                <input
                  type="email"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Nhập gmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group mb-1">
                <input
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-group mb-1">
                <input
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Nhập địa chỉ"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/*    <div className="input-group mb-1">
                <input
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Nhập lại mật khẩu"
                />
              </div>
              <div className="input-group mb-5">
                <input
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Địa chỉ"
                />
              </div>
               */}
              <div className="input-group mb-2 mt-4">
                <button className="btn btn-lg btn-primary w-100 fs-6">
                  Đăng kí
                </button>
              </div>
            </form>
            <div className="row">
              <small>
                Đã có tài khoảng? <Link to={"/login"}>Đăng nhập</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
