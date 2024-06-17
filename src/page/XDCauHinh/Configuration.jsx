import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRotate, faTrash } from "@fortawesome/free-solid-svg-icons";

const Configuration = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [id, setId] = useState("");
  const [category, setCategory] = useState([]);
  const [catProducts, setCatProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [userId, setUserId] = useState("");

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

  const getCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/category");
      setCategory(response.data);
    } catch (error) {}
  };

  const handelGetAllProductById = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/category/${categoryId}`
      );
      setCatProducts(response.data.products);
    } catch (error) {}
  };

  const handleSelectProduct = (product) => {
    setSelectedProducts((prevSelectedProducts) => [
      ...prevSelectedProducts,
      { ...product, quantity: 1 }, // Thêm trường quantity với giá trị mặc định là 1
    ]);
  };

  const handleDeleteProduct = (productId) => {
    const updatedSelectedProducts = selectedProducts.filter(
      (product) => product._id !== productId
    );
    setSelectedProducts(updatedSelectedProducts);
  };
  console.log(selectedProducts);

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedSelectedProducts = selectedProducts.map((product) => {
      if (product._id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setSelectedProducts(updatedSelectedProducts);
  };

  const handleAddProductCart = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/cart/products", {
        userId,
        products: selectedProducts.map((product) => ({
          productId: product._id,
          quantity: product.quantity,
        })),
      });
      console.log(res);
    } catch (error) {
      console.error("Error adding products to cart:", error);
    }
  };
  const calculateTotal = () => {
    let total = 0;
    selectedProducts.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total.toLocaleString(); // Format lại số tiền để đẹp
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo._id) {
      fetchCartItems(userInfo._id);
      setUserId(userInfo._id);
    }
    getCategory();
  }, [id, searchTerm]);

  return (
    <>
      <div className="container">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          cartItemCount={cartItems.length}
        />

        <HeadNavNoBanNer />

        <div className="d-flex justify-content-between">
          <div
            style={{
              background: "red",
              padding: " 10px",
              borderRadius: "10px",
            }}
            onClick={() => window.location.reload()}
          >
            <FontAwesomeIcon icon={faRotate} style={{ color: "#ffffff" }} />
            <span style={{ color: "white", cursor: "pointer" }}>
              {" "}
              Xây dựng lại
            </span>
          </div>

          <div>
            <button
              onClick={handleAddProductCart}
              className="mx-4"
              style={{
                background: "red",
                padding: " 10px",
                borderRadius: "10px",
                color: "white",
                border: "none",
              }}
            >
              Thêm vào giỏ hàng
            </button>
            <span>
              Tiền tạm tính{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                {calculateTotal()}đ
              </span>
            </span>
          </div>
        </div>

        {category.map((categori, index) => (
          <div className="row m-4" key={index}>
            <div
              className="col-2"
              style={{
                borderRight: "1px solid black",
                borderBottom: "1px solid black",
              }}
            >
              <span>{categori.name}</span>
            </div>
            <div
              className="col-10 py-2"
              style={{ borderBottom: "1px solid black" }}
            >
              {selectedProducts.some(
                (product) => product.category_id === categori._id
              ) ? (
                <div className="row m-4">
                  {selectedProducts.map((selectedProduct, idx) => {
                    if (selectedProduct.category_id === categori._id) {
                      return (
                        <div className="col-12 my-2" key={idx}>
                          <div className="row">
                            <div className="col-2">
                              <img
                                style={{ width: "150px" }}
                                src={`http://localhost:8000/${selectedProduct.image}`}
                                alt={selectedProduct.name}
                              />
                            </div>
                            <div className="col-10 py-2">
                              <p style={{ fontWeight: "bold" }}>
                                Tên sản phẩm: {selectedProduct.name}
                              </p>
                              <p style={{ color: "red" }}>
                                Giá: {selectedProduct.price.toLocaleString()}đ
                              </p>
                              <p>Mã sản phẩm: {selectedProduct._id}</p>
                              <div className="d-flex align-items-center">
                                <input
                                  type="number"
                                  value={selectedProduct.quantity}
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      selectedProduct._id,
                                      parseInt(e.target.value)
                                    )
                                  }
                                  className="form-control text-center"
                                  style={{ width: "80px", marginRight: "10px" }}
                                  min={1}
                                />
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  style={{
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    handleDeleteProduct(selectedProduct._id)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ) : (
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handelGetAllProductById(categori._id)}
                  style={{
                    width: "250px",
                    borderRadius: "10px",
                    background: "red",
                    color: "white",
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />
                  Chọn {categori.name}
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Modal */}
        <div>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Chọn linh kiện!
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  {catProducts.map((catProduct, index) => (
                    <div
                      className="d-flex my-3"
                      key={index}
                      style={{ borderBottom: "1px solid black" }}
                    >
                      <div className="py-2">
                        <img
                          style={{ width: "150px" }}
                          src={`http://localhost:8000/${catProduct.image}`}
                          alt={catProduct.name}
                        />
                      </div>
                      <div className="py-2 px-4">
                        <p style={{ fontWeight: "bold" }}>
                          Tên sản phẩm: {catProduct?.name}
                        </p>
                        <p style={{ color: "red" }}>
                          Giá: {catProduct?.price.toLocaleString()}đ
                        </p>
                        <p>Mã sản phẩm: {catProduct?._id}</p>
                        <button
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                          onClick={() => handleSelectProduct(catProduct)}
                          style={{
                            width: "100px",
                            borderRadius: "10px",
                            background: "red",
                            color: "white",
                          }}
                        >
                          Chọn
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="modal-footer"></div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Configuration;
