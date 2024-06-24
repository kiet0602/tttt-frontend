import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRotate, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import FillterXDCH from "../../components/FilterXDCH/FillterXDCH";
import XDCHImgmodel from "../../components/XDCH-img/XDCHImgmodel";

const Configuration = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [id, setId] = useState("");
  const [category, setCategory] = useState([]);
  const [catProducts, setCatProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [userId, setUserId] = useState("");
  const [nameCategory, setNameCategory] = useState("");

  const [selectedBand, setSelectedBand] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

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
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handelGetAllProductById = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/category/${categoryId}`
      );
      setId(categoryId);
      setCatProducts(response.data.products);
      setNameCategory(response.data.name);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  const handleDeleteProduct = (productId) => {
    const updatedSelectedProducts = selectedProducts.filter(
      (product) => product._id !== productId
    );
    setSelectedProducts(updatedSelectedProducts);
  };

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
      await axios.post("http://localhost:8000/api/cart/products", {
        userId,
        products: selectedProducts.map((product) => ({
          productId: product._id,
          quantity: product.quantity,
        })),
      });
      toast.success("Thêm sản phẩm vào giỏ hàng thành công");
    } catch (error) {
      console.error("Error adding products to cart:", error);
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProducts((prevSelectedProducts) => [
      ...prevSelectedProducts.filter((p) => p._id !== product._id),
      { ...product, quantity: 1 }, // Add quantity field with default value 1
    ]);
  };
  const calculateTotal = () => {
    let total = 0;
    selectedProducts.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total.toLocaleString(); // Format the amount to make it look nicer
  };

  const fetchFilteredProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/product?ram=${selectedCapacity}&manufacturer=${selectedBand}&color=${selectedColor}`
      );

      const filteredProducts = response.data.data.filter((product) => {
        return product.category_id._id === id; // Lọc sản phẩm có category_id trùng với id
      });

      console.log(filteredProducts); // Kiểm tra filteredProducts
      setCatProducts(filteredProducts); // Cập nhật danh sách sản phẩm đã lọc vào state
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo._id) {
      fetchCartItems(userInfo._id);
      setUserId(userInfo._id);
    }
    getCategory();
  }, [id, searchTerm]);

  useEffect(() => {
    if (selectedBand) {
      fetchFilteredProducts();
    }
    if (selectedCapacity) {
      fetchFilteredProducts();
    }
    if (selectedColor) {
      fetchFilteredProducts();
    }
    if (!selectedBand || !selectedCapacity || !selectedColor) {
      fetchFilteredProducts();
    }
  }, [selectedBand, selectedCapacity, selectedColor]);

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
              padding: "10px",
              borderRadius: "10px",
            }}
            onClick={() => window.location.reload()}
          >
            <FontAwesomeIcon icon={faRotate} style={{ color: "#ffffff" }} />
            <span style={{ color: "white", cursor: "pointer" }}>
              Xây dựng lại
            </span>
          </div>
          <div>
            <button
              onClick={handleAddProductCart}
              className="mx-4"
              style={{
                background: "red",
                padding: "10px",
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
        <div style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}>
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
                              <div className="col-10 px-5">
                                <p style={{ fontWeight: "bold" }}>
                                  Tên sản phẩm: {selectedProduct.name}
                                </p>
                                <p style={{ color: "red" }}>
                                  Giá: {selectedProduct.price.toLocaleString()}đ
                                </p>
                                <p>Mã sản phẩm: {selectedProduct._id}</p>
                                <div className="d-flex align-items-center">
                                  Số lượng:
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
                                    style={{
                                      width: "60px",
                                      marginRight: "10px",
                                      height: "30px",
                                    }}
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
                      width: "100px",
                      borderRadius: "10px",
                      background: "red",
                      color: "white",
                    }}
                  >
                    Chọn
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <XDCHImgmodel selectedProducts={selectedProducts} />
        <Footer />
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{ maxWidth: "80vw" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {nameCategory}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div
                  className="col-3"
                  style={{
                    borderRight: "1px solid black",
                    maxHeight: "calc(100vh - 180px)",
                    overflowY: "auto",
                  }}
                >
                  <FillterXDCH
                    nameCategory={nameCategory}
                    selectedBand={selectedBand}
                    setSelectedBand={setSelectedBand}
                    selectedCapacity={selectedCapacity}
                    setSelectedCapacity={setSelectedCapacity}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                  />
                </div>
                <div
                  className="col-9"
                  style={{
                    maxHeight: "calc(100vh - 180px)",
                    overflowY: "auto",
                  }}
                >
                  {catProducts.length === 0 ? (
                    <div className="text-center mt-3">Không có sản phẩm</div>
                  ) : (
                    catProducts.map((catProduct, index) => (
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
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Configuration;
