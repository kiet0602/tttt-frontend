import React from "react";
import "./LoginPage.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import avatar from "../../../src/assets/img/1.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      //  console.log("sadas");
      fetch("http://localhost:8001/User/" + id)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          if (Object.keys(resp).length === 0) {
            toast.error("please enter a valid email address");
          } else {
            if (resp.password === password) {
              toast.success("success");
              sessionStorage.setItem("id", id);
              setNavigate(true);
            } else {
              toast.error("please enter a valid");
            }
          }
        })
        .catch((err) => {
          toast.error("Login failed" + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (id === "" || id === null) {
      result = false;
      toast.warning("please enter a valid id");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("please enter a valid password");
    }
    return result;
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
                  placeholder="Nhập Id"
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <button className="btn btn-lg btn-primary w-100 fs-6">
                  Đăng nhập
                </button>
              </div>
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
                <button className="btn  btn-light w-100 fs-6 mt-2">
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
            </form>
            <div className="row">
              <small>
                Chưa có tài khoảng? <Link to={"/register"}>Đăng kí</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
