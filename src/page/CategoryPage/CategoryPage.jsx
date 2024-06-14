import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";
import { ToastContainer, toast } from "react-toastify";
import "./CategoryPage.css";
import BlockTitle from "../../components/BlockTitle/BlockTitle";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [category, setCategory] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      fetchCartItems(userInfo?._id);
    }
  }, []);

  const fetchCartItems = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/cart/${userId}`
      );
      setCartItems(response?.data?.data?.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const addCart = async (productId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
        navigate("/login");
        return;
      }
      const userId = userInfo?._id;
      await axios.post("http://localhost:8000/api/cart", {
        userId,
        productId,
        quantity: 1,
      });
      toast.success("Đã thêm sản phẩm vào giỏ hàng thành công!");
      // Fetch updated cart items
      fetchCartItems(userId);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchProductsByCriteria = async (sortBy, order) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/product/criteria?sortBy=${sortBy}&order=${order}`
      );
      setProducts(response.data.data);
    } catch (error) {
      console.log("Error fetching products by criteria:", error);
    }
  };

  useEffect(() => {
    const getProductsCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/category/${id}`
        );
        const productData = response.data.products;
        const filteredProducts = productData.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(filteredProducts);
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProductsCategory();
  }, [id, searchTerm]);

  useEffect(() => {
    if (sortCriteria) {
      const sortedProducts = [...products].sort((a, b) => {
        switch (sortCriteria) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          case "sold_quantity-desc":
            return b.sold_quantity - a.sold_quantity;
          case "average_star-asc":
            return a.average_star - b.average_star;
          default:
            return 0;
        }
      });
      setProducts(sortedProducts);
    }
  }, [sortCriteria, products]);

  return (
    <div className="container">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartItemCount={cartItems.length}
      />
      <HeadNavNoBanNer />
      {category && <BlockTitle title={category.name} />}
      <div className="sort-dropdown m-3 text-end">
        <label htmlFor="sort">Sắp xếp theo: </label>
        <select
          id="sort"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="">Mặc định</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
          <option value="name-asc">Tên A-Z</option>
          <option value="name-desc">Tên Z-A</option>
          <option value="sold_quantity-desc">Số lượng bán</option>
          <option value="average_star-asc">Đánh giá tăng dần</option>
        </select>
      </div>
      <div className="row">
        {products.length === 0 ? (
          <p className="text-center font-bold">
            Không có sản phẩm nào được tìm thấy.
          </p>
        ) : (
          products.map((product) => (
            <div className="col-3 box-product mt-1" key={product._id}>
              <div className="text-center">
                <img
                  style={{ width: "300px", height: "150px" }}
                  className="img-fluid"
                  src={`http://localhost:8000/${product.image}`}
                  alt={product.name}
                />
                <span className="text-center">
                  {product.name.substring(0, 40)}...
                </span>
                <p
                  style={{
                    color: "red",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  {product.price.toLocaleString()} đ
                </p>
                <div className="d-flex">
                  <div>
                    <button
                      className="btnAddProduct3"
                      onClick={() => addCart(product._id)}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                  <div>
                    <button
                      className="btnProduct3"
                      onClick={(e) => {
                        navigate(`/ProductDetails/${product._id}`);
                      }}
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default CategoryPage;
