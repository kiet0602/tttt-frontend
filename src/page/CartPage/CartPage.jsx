import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";
import { Link, useNavigate } from "react-router-dom";
import "./CartPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faFaceFrown,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import PayPal from "../../components/PayPal";
import imgGiohang from "../../assets/img/Remove-bg.ai_1718257572075.png";

const CartPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const dismissButtonRef = useRef(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUserId(userInfo?._id);
    }
  }, []);

  useEffect(() => {
    getProductsAll();
    fetchCartItems();
  }, [userId]);

  const getProductsAll = async () => {
    if (!userId) return;

    try {
      const response = await axios.get(
        `http://localhost:8000/api/cart/${userId}`
      );
      setProducts(response?.data?.data?.items);
      const newQuantities = response?.data?.data?.items.reduce(
        (acc, product) => {
          acc[product.product_id._id] = product.quantity;
          return acc;
        },
        {}
      );
      setQuantities(newQuantities);
      const total = response?.data?.data?.items.reduce((total, product) => {
        return total + product.product_id.price * product.quantity;
      }, 0);
      setTotalPrice(total);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/cart/${userId}`
      );
      setCartItems(response?.data?.data?.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const updateProductItemCart = async (quantity, productId) => {
    try {
      await axios.put(`http://localhost:8000/api/cart`, {
        userId,
        productId,
        quantity,
      });
      getProductsAll();
    } catch (error) {
      toast.error("Lỗi");
    }
  };

  const increase = (productId) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [productId]: prevQuantities[productId] + 1,
      };
      updateProductItemCart(newQuantities[productId], productId);
      return newQuantities;
    });
  };

  const decrease = (productId) => {
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max(prevQuantities[productId] - 1, 0);
      if (newQuantity === 0) {
        return prevQuantities;
      }

      const newQuantities = {
        ...prevQuantities,
        [productId]: newQuantity,
      };
      updateProductItemCart(newQuantities[productId], productId);
      return newQuantities;
    });
  };

  const removeProductItemCart = async (productId) => {
    try {
      await axios.delete("http://localhost:8000/api/cart", {
        data: {
          userId,
          productId,
        },
      });
      getProductsAll();
      fetchCartItems(userId);
      toast.success("Sản phẩm đã xóa khỏi giỏ hàng!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleQuantityChange = (productId, value) => {
    let quantity = parseInt(value, 10);

    // If quantity is not a number or less than 1, set it to 1
    if (isNaN(quantity) || quantity < 1) {
      quantity = 1;
    }

    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [productId]: quantity,
      };
      updateProductItemCart(quantity, productId);
      return newQuantities;
    });
  };

  const handleContinueShopping = () => {
    navigate("/productsAll");
  };

  const handleCheckout = () => {
    navigate(`/checkout/${userId}`);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const paymentSingle = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/order", {
        userId,
        orderFromCart: true,
        singleCartItem: { product_id: selectedItem.product_id._id },
      });
      toast.success("Bạn đã đặt hàng thành công!");
      if (dismissButtonRef.current) {
        dismissButtonRef.current.click();
      }
      // navigate("/profile");
      fetchCartItems();
      getProductsAll();
    } catch (error) {
      toast.error("Sản phẩm bạn mua vượt quá số lượng trong kho!");
    }
  };

  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartItemCount={cartItems.length}
      />
      <HeadNavNoBanNer />
      <div className="container">
        {products.length === 0 ? (
          <div className="text-center d-flex flex-column align-items-center">
            <img
              style={{ width: "400px" }}
              src={imgGiohang}
              alt="Giỏ hàng trống"
            />
            <p style={{ fontSize: "20px" }}>
              Không có sản phẩm nào trong giỏ hàng của bạn.
            </p>
            <FontAwesomeIcon
              icon={faFaceFrown}
              style={{ color: "#FFD43B", fontSize: "40px", marginTop: "20px" }}
            />
          </div>
        ) : (
          <div className="row">
            <p className="fs-4">Giỏ hàng</p>
            <div className="col-8">
              <table
                className="table table-white"
                style={{
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  borderRadius: "30px",
                  overflow: "hidden",
                }}
              >
                <thead className="boxx" style={{ textAlign: "center" }}>
                  <tr>
                    <th scope="col">Hình</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Tổng</th>
                    <th scope="col">Xóa</th>
                    <th scope="col">Mua</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.product_id._id}
                      style={{ textAlign: "center" }}
                    >
                      <td>
                        <Link to={`/ProductDetails/${product.product_id._id}`}>
                          <img
                            style={{ width: "100px" }}
                            src={`http://localhost:8000/${product.product_id.image}`}
                            alt={product.product_id.name}
                          />
                        </Link>
                      </td>
                      <td className="nameProducts-cart">
                        {product.product_id.name}
                      </td>
                      <td className="priceProducts-cart">
                        {product.product_id.price.toLocaleString()}đ
                      </td>
                      <td>
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                            padding: 10,
                            margin: 0,
                            fontSize: "30px",
                            color: "black",
                          }}
                          onClick={() => decrease(product.product_id._id)}
                          onMouseEnter={(e) => (e.target.style.color = "red")}
                          onMouseLeave={(e) => (e.target.style.color = "black")}
                        >
                          -
                        </button>
                        <span
                          style={{
                            fontSize: "30px",
                            margin: "0 10px",
                          }}
                        >
                          <input
                            type="number"
                            style={{
                              width: "50px",
                              textAlign: "center",
                              fontSize: "20px",
                              margin: "0 10px",
                            }}
                            value={quantities[product.product_id._id]}
                            onChange={(e) =>
                              handleQuantityChange(
                                product.product_id._id,
                                e.target.value
                              )
                            }
                          />
                        </span>
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                            padding: 10,
                            margin: 0,
                            fontSize: "30px",
                            color: "black",
                          }}
                          onClick={() => increase(product.product_id._id)}
                          onMouseEnter={(e) => (e.target.style.color = "red")}
                          onMouseLeave={(e) => (e.target.style.color = "black")}
                        >
                          +
                        </button>
                      </td>
                      <td className="SumPrice-cart">
                        {(
                          product.product_id.price *
                          quantities[product.product_id._id]
                        ).toLocaleString()}
                        đ
                      </td>
                      <td>
                        <FontAwesomeIcon
                          onClick={() =>
                            removeProductItemCart(product.product_id._id)
                          }
                          style={{
                            fontSize: "20px",
                            cursor: "pointer",
                            marginTop: "32px",
                          }}
                          className="delete-cart"
                          icon={faTrash}
                        />
                      </td>
                      <td>
                        <p>
                          <FontAwesomeIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => handleItemClick(product)}
                            icon={faBasketShopping}
                            class="payment-card"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                          />
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-4">
              <div className="d-flex justify-content-between">
                <div>Tổng</div>
                <div className="SumPayment-cart">
                  {totalPrice.toLocaleString()} đ
                </div>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <div>
                  <button
                    className="btn-back-allProducts"
                    onClick={handleContinueShopping}
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
                <div>
                  <button className="btn-Payment" onClick={handleCheckout}>
                    Thông tin đơn hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <ToastContainer />

      {/* Modal */}
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title " id="staticBackdropLabel">
                Thông tin sản phẩm
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={dismissButtonRef}
              ></button>
            </div>
            <div class="modal-body">
              {selectedItem && (
                <>
                  <img
                    src={`http://localhost:8000/${selectedItem.product_id.image}`}
                    style={{ width: "100px" }}
                  />
                  <h5>{selectedItem.product_id.name}</h5>
                  <p>
                    Giá:
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      {selectedItem.product_id.price.toLocaleString()}đ
                    </span>
                  </p>
                  <p>
                    Số lượng:
                    <span style={{ color: "blue", fontWeight: "bold" }}>
                      {quantities[selectedItem.product_id._id]}
                    </span>
                  </p>
                  <p>
                    Tổng:
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      {(
                        selectedItem.product_id.price *
                        quantities[selectedItem.product_id._id]
                      ).toLocaleString()}
                      đ
                    </span>
                  </p>
                  <hr />
                  <p>Thanh toán bằng PayPal</p>
                  <PayPal
                    cost={
                      selectedItem?.product_id?.price *
                      quantities[selectedItem?.product_id?._id]
                    }
                    handleClickX={paymentSingle}
                  />
                  <p>Thanh toán bằng tiền mặt</p>
                  <button
                    style={{ width: "100%", background: "red" }}
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={paymentSingle}
                  >
                    Thanh toán khi giao hàng
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
