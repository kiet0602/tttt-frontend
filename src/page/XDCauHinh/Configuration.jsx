import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";
import axios from "axios";

const Configuration = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [products, setProducts] = useState([]); // Đổi tên từ product thành products để tránh xung đột với state khác
  const [category, setCategory] = useState(null);
  const [id, setId] = useState(""); // Khởi tạo state id
  const [selectedCategory, setSelectedCategory] = useState(null); // State để lưu trữ loại sản phẩm được chọn
  const [modalOpen, setModalOpen] = useState(false); // State để điều khiển trạng thái mở/đóng modal

  const getProductsCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/category/${id}`
      );
      setProducts(response.data);
      console.log(response.data);
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

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

  const getAccessories = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/accessory`);
      setAccessories(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm mở modal và đặt loại sản phẩm được chọn
  const openModal = (category) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo._id) {
      fetchCartItems(userInfo._id);
    }
    getAccessories();
    getProductsCategory();
  }, [id, searchTerm]); // Thêm id và searchTerm vào dependency array để useEffect được gọi lại khi có thay đổi

  return (
    <div className="container">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartItemCount={cartItems.length}
      />

      <HeadNavNoBanNer />
      <div className="d-flex justify-content-between">
        <div style={{ background: "red", padding: " 10px" }}>Xây dựng lại</div>
        <div>
          <span>Tiền tạm tính 0đ</span>
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col" className="col-4">
              Category Name
            </th>
            <th scope="col" className="col-3">
              Action
            </th>
            <th scope="col" className="col-5">
              Products
            </th>
          </tr>
        </thead>
        <tbody>
          {accessories.map((accessory, index) => (
            <tr key={index}>
              <td className="align-middle col-4">
                {accessory.categories.map((category, catIndex) => (
                  <div key={catIndex} className="p-3">
                    <span>{category.name}</span>
                  </div>
                ))}
              </td>
              <td className="align-middle col-3">
                {accessory.categories.map((category, catIndex) => (
                  <div key={catIndex} className="d-flex align-items-center">
                    <button
                      className="btn btn-primary me-2 m-2"
                      onClick={() => openModal(category)}
                    >
                      Chọn {category.name}
                    </button>
                  </div>
                ))}
              </td>
              <td className="align-middle col-5">
                {accessory.categories.map((category, catIndex) => (
                  <div key={catIndex}>
                    {/* Hiển thị sản phẩm tương ứng với category.name */}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />

      {/* Modal 1 */}
      <div
        className={`modal ${modalOpen ? "show" : ""}`}
        tabIndex="-1"
        style={{ display: modalOpen ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">
                {selectedCategory && `${selectedCategory.name} Products`}
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setModalOpen(false)}
              ></button>
            </div>
            <div className="modal-body">
              {selectedCategory &&
                selectedCategory.products.map((product, index) => (
                  <div key={index} className="mb-3">
                    <h6>{product.name}</h6>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid mb-2"
                      style={{ maxHeight: "150px" }}
                    />
                    <p>{product.description}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Price: {product.price}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal 2 */}
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                Modal 1
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Show a second modal and hide this one with the button below.
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
              >
                Open second modal
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
                Modal 2
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Hide this modal and show the first with the button below.
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
              >
                Back to first
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn btn-primary"
        data-bs-target="#exampleModalToggle"
        data-bs-toggle="modal"
      >
        Open first modal
      </button>
    </div>
  );
};

export default Configuration;
