import React from "react";
import "./RegisterPage.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường không được để trống
    if (!username || !email || !password || !address) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (username.length < 6) {
      toast.error("Tên của bạn ít nhất 6 ký tự.");
      return;
    }

    // Kiểm tra độ dài password
    if (password.length < 6) {
      toast.error("Mật khẩu cần ít nhất 6 ký tự.");
      return;
    }

    // Kiểm tra độ dài password

    // Kiểm tra định dạng email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Email không hợp lệ.");
      return;
    }

    // Thực hiện đăng ký nếu thông tin hợp lệ
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", avatarFile);
      formData.append("address", address);

      const response = await axios.post(
        "http://localhost:8000/api/authentication/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Reset form fields after successful registration
      setUsername("");
      setEmail("");
      setPassword("");
      setAddress("");
      setAvatarFile(null);

      toast.success("Đăng ký thành công!");
    } catch (error) {
      toast.error("Đăng ký thất bại email đã tồn tại", error);
    }
  };

  const handleAvatarChange = (event) => {
    setAvatarFile(event.target.files[0]);
  };

  return (
    <>
      <div className="wrapper">
        <h1>Chào bạn!</h1>
        <p className="title-register">
          Hãy là 1 thành viên của chúng tôi! <br /> Xin chào!
        </p>
        <form className="form-register">
          <div className="pb-2">
            {avatarFile && (
              <img
                src={URL.createObjectURL(avatarFile)}
                alt="Avatar"
                className="img-fluid"
                style={{ width: 200 }}
              />
            )}
          </div>
          <input
            className=""
            type="text"
            placeholder="Tên người dùng"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Nhập password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nhập địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="file"
            placeholder="Address"
            onChange={handleAvatarChange}
          />
        </form>
        <button className="btn-register" onClick={handleRegister}>
          Đăng kí
        </button>

        <div className="not-member">
          Not a member? <Link to={"/login"}>Đăng nhập!</Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default RegisterPage;
