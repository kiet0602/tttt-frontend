import React from "react";
import "./LoginPage.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import avatar from "../../../src/assets/img/1.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [navigate, setNavigate] = useState(false);

  async function handleFacebookLogin() {
    try {
      // Gửi yêu cầu GET đến endpoint /auth/facebook
      const response = await axios.get("http://localhost:8000/auth/facebook");
      // Chuyển hướng người dùng đến trang Facebook để xác thực
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error("Error during Facebook login:", error);
    }
  }

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  if (code) {
    handleFacebookCallback(code);
  }

  async function handleFacebookCallback(code) {
    try {
      // Gửi yêu cầu GET đến điểm cuối /auth/facebook/callback với tham số code
      await axios.get(
        `http://localhost:8000/auth/facebook/callback?code=${code}`
      );
      // Chuyển hướng người dùng về trang chủ
      window.location.href = "/";
    } catch (error) {
      console.error("Error during Facebook callback:", error);
      // Chuyển hướng người dùng về trang đăng nhập
      window.location.href = "/login";
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/authentication/login-user`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;
      console.log(data);
      setNavigate(true);
      toast.success("Đăng nhập thành công!");
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("userInfo", JSON.stringify(data.props));
    } catch (error) {
      toast.error(`Đăng nhập thất bại!`);
    }
  };
  if (navigate) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow box-area">
        <div
          className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
          style={{ background: "#103cbe" }}
        >
          <div className="featured-image mb-3">
            <img src={avatar} className="img-fluid" style={{ width: 250 }} />
          </div>
          <small
            className="text-white text-wrap text-center"
            style={{
              width: "17rem",
              fontFamily: '"Courier New", Courier, monospace',
            }}
          >
            Chào bạn!
          </small>
        </div>

        <div className="col-md-6 right-box">
          <div className="row align-items-center">
            <div className="header-text mb-4">
              <h2>Chào bạn!</h2>
              <p>Chúng tôi hạnh phúc khi bạn quay lại.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-1">
                <input
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Nhập Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <button className="btn login btn-lg w-100 fs-6">
                  Đăng nhập
                </button>
              </div>
            </form>
            <div className="input-group mb-3 ">
              <button className="btn  btn-light w-100 fs-6">
                <small>
                  <FontAwesomeIcon
                    className="px-2"
                    icon={faGoogle}
                    style={{ color: "#fd0d0d" }}
                  />
                  Đăng nhập bằng Google
                </small>
              </button>
              <button
                onClick={handleFacebookLogin}
                className="btn  btn-light w-100 fs-6 mt-2"
              >
                <small>
                  <FontAwesomeIcon
                    className="px-2"
                    icon={faFacebook}
                    style={{ color: "#0a5ae6" }}
                  />
                  Đăng nhập bằng Facebook
                </small>
              </button>
            </div>
            <div className="row">
              <small>
                Chưa có tài khoảng? <Link to={"/register"}>Đăng kí</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
