import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./page/LoginPage/LoginPage";
import RegisterPage from "./page/Register/RegisterPage";
import HomePage from "./page/HomePage/HomePage";
import ProductDetails from "./page/ProductDetails/ProductDetails";
import CategoryPage from "./page/CategoryPage/CategoryPage";
import ProductAll from "./page/ProductAll/ProductAll";
import Profile from "./page/Profile/Profile";
import AccessoryPage from "./page/AccessoryPage/AccessoryPage";
import OAuthCallback from "./page/OAuthCallback/OAuthCallback";
import CartPage from "./page/CartPage/CartPage";
import CheckoutPage from "./page/CheckoutPage/CheckoutPage";
import Configuration from "./page/XDCauHinh/Configuration";
import ContactPage from "./page/ContactPage/ContactPage";
import GioiThieuPage from "./page/GioiThieuPage/GioiThieuPage";
import ChinhSachBH from "./page/ChinhSachBH/ChinhSachBH";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/oauth-callback/:token" element={<OAuthCallback />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/ProductDetails/:id" element={<ProductDetails />} />
      <Route path="/Accessory/:id" element={<AccessoryPage />} />
      <Route path="/Category/:id" element={<CategoryPage />} />
      <Route path="/productsAll" element={<ProductAll />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/xdch" element={<Configuration />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/gioithieu" element={<GioiThieuPage />} />
      <Route path="/csbh" element={<ChinhSachBH />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout/:id" element={<CheckoutPage />} />
    </Routes>
  );
}

export default App;
