import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./page/LoginPage/LoginPage";
import RegisterPage from "./page/Register/RegisterPage";
import HomePage from "./page/HomePage/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
