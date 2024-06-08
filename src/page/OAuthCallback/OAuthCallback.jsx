import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const userInfo = await fetchUserInfo(token);
          localStorage.setItem("token", token);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          toast.success("Đăng nhập thành công!");
          navigate("/");
        } else {
          toast.error("Không tìm thấy token trong URL!");
          navigate("/login");
        }
      } catch (error) {
        toast.error("Đăng nhập thất bại! Vui lòng thử lại sau.");
        navigate("/login");
      }
    };

    fetchData();
  }, [token, navigate]);

  return <div>Processing...</div>;
};

export default OAuthCallback;
