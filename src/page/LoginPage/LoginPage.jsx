import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import avatar from "../../../src/assets/img/1.png";
import logologin from "../../assets/img/LogoLogin.PNG";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [navigateHome, setNavigateHome] = useState(false);
  const [tokenProcessed, setTokenProcessed] = useState(false);
  const token = localStorage.getItem("token");

  const handleFacebookLogin = async () => {
    try {
      const response = await axios.get("http://localhost:8000/auth/facebook");
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error("Error during Facebook login:", error);
    }
  };

  const handleFacebookCallback = async (code) => {
    try {
      await axios.get(
        `http://localhost:8000/auth/facebook/callback?code=${code}`
      );
      window.location.href = "/";
    } catch (error) {
      console.error("Error during Facebook callback:", error);
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code && !tokenProcessed) {
      handleFacebookCallback(code);
      setTokenProcessed(true);
    }
    if (token) {
      navigate("/");
    }
  }, [tokenProcessed, token, navigate]);

  const validateEmail = (email) => {
    // Basic email validation regex
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.[^<>()[\]\.,;:\s@"]{2,}))$/i;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    // Password must be at least 6 characters
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Email không hợp lệ!");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/authentication/login-user`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { data } = response;
      localStorage.setItem("token", data?.accessToken);
      localStorage.setItem("userId", data?.props?._id);
      localStorage.setItem("userInfo", JSON.stringify(data?.props));
      toast.success("Đăng nhập thành công!");
      setNavigateHome(true);
    } catch (error) {
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!");
    }
  };

  if (navigateHome) {
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
            <img
              src={logologin}
              className="img-fluid"
              style={{ width: 350, borderRadius: "20px" }}
              alt="avatar"
            />
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
              <button
                style={{
                  borderRadius: "10px",
                  background: "white",
                  border: "1px solid black",
                }}
                className="btn btn-light w-100 fs-6"
              >
                <a
                  href="http://localhost:8000/auth/google"
                  style={{ textDecorationLine: "none", color: "black" }}
                >
                  <FontAwesomeIcon
                    className="px-2"
                    icon={faGoogle}
                    style={{ color: "#fd0d0d" }}
                  />
                  Đăng nhập bằng Google
                </a>
              </button>
              <button
                style={{
                  borderRadius: "10px",
                  background: "white",
                  border: "1px solid black",
                }}
                onClick={handleFacebookLogin}
                className="btn btn-light w-100 fs-6 mt-2"
              >
                <a
                  href="http://localhost:8000/auth/facebook"
                  style={{ textDecorationLine: "none", color: "black" }}
                >
                  <FontAwesomeIcon
                    className="px-2"
                    icon={faFacebook}
                    style={{ color: "#0a5ae6" }}
                  />
                  Đăng nhập bằng Facebook
                </a>
              </button>
            </div>
            <div className="row">
              <small>
                Chưa có tài khoản? <Link to={"/register"}>Đăng kí</Link>
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
