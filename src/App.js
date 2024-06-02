import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./page/LoginPage/LoginPage";
import RegisterPage from "./page/Register/RegisterPage";
import HomePage from "./page/HomePage/HomePage";
import ProductDetails from "./page/ProductDetails/ProductDetails";
import CategoryPage from "./page/CategoryPage/CategoryPage";
import PCPage from "./page/PCPage/PCPage";
import ProductAll from "./page/ProductAll/ProductAll";
import Profile from "./page/Profile/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/ProductDetails/:id" element={<ProductDetails />} />
      <Route path="/products/:categoryId" element={<CategoryPage />} />
      <Route path="/productsAll" element={<ProductAll />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
