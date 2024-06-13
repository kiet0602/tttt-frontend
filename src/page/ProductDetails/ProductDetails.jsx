import React, { useEffect, useState } from "react";
import "./ProductsDetail.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";
import Footer from "../../components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faStar } from "@fortawesome/free-solid-svg-icons";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [star, setStar] = useState(0);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [isComment, setIsComment] = useState(false);
  const [Usercomment, Setusercomment] = useState([]);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [currentUserComment, setCurrentUserComment] = useState(null);

  const checkProductIdExists = (data, productId) => {
    return data.some((order) =>
      order.orderDetails.some((detail) => detail.product_id === productId)
    );
  };

  const getAllproductsOrder = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userId = userInfo?._id;
    try {
      const res = await axios.get(
        `http://localhost:8000/api/order/user/${userId}`
      );
      setIsComment(checkProductIdExists(res.data.data, id));
    } catch (error) {
      console.error("Error fetching orders:", error);
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
      toast.success("Đã thêm sản phẩm vào giỏ hàng!");
      fetchCartItems(userId); // Fetch updated cart items
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      fetchCartItems(userInfo?._id);
    }
    getAllproductsOrder();
    const getProductById = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/product/${id}`
        );
        setProduct(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    comment();
    getProductById();
  }, [id]);

  const handleRatingChange = (e) => {
    setStar(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmitComment = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        alert("Vui lòng đăng nhập để viết đánh giá.");
        navigate("/login");
        return;
      }
      const userId = userInfo?._id;
      const res = await axios.post(`http://localhost:8000/api/comment`, {
        user_id: userId,
        product_id: id,
        star,
        content,
      });
      toast.success("Đã gửi đánh giá");
      comment();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const comment = async (userId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const { data } = await axios.get(
        `http://localhost:8000/api/comment/${id}`
      );
      Setusercomment(data);
      // Check if the current user has reviewed the product
      const userReview = data.find(
        (comment) => comment.user_id._id === userInfo?._id
      );
      if (userReview) {
        setHasReviewed(true);
        setCurrentUserComment(userReview);
      } else {
        setHasReviewed(false);
        setCurrentUserComment(null);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  const handleDeleteComment = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const userId = userInfo?._id;
      await axios.delete(`http://localhost:8000/api/comment/${userId}/${id}`);
      toast.success("Đã xóa đánh giá");
      comment(); // Refresh comments
    } catch (error) {
      toast.error(error.message);
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
      {product && (
        <div className="container">
          <div className="d-flex justify-content-between box-title text-center ">
            <span className="text-end text-title-regorogy">{product.name}</span>
            <span className="text-start" style={{ fontSize: "13px" }}>
              {product.average_star.toFixed(1)}
              <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
              <p>Dựa trên ({product.comment_count}) đánh giá</p>
            </span>
          </div>
          <div className="row">
            <div className="col-6">
              <div>
                <img
                  className="img-fluid rounded mt-2"
                  style={{ width: "700px", height: "450px" }}
                  src={`http://localhost:8000/${product.image}`}
                  alt=""
                />
              </div>
              <div className="mt-5 d-flex justify-content-between">
                <div>
                  <div
                    className="my-3"
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      borderBottom: "1px solid #00000029",
                      width: "635px",
                    }}
                  >
                    Đánh giá:
                  </div>

                  <div>
                    {Usercomment.map((commentuser) => (
                      <div key={commentuser._id}>
                        <img
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "100%",
                          }}
                          src={
                            commentuser?.user_id?.avatar?.startsWith("https")
                              ? commentuser?.user_id?.avatar
                              : commentuser?.user_id?.avatar
                              ? `http://localhost:8000/${commentuser?.user_id?.avatar}`
                              : "https://i.pinimg.com/736x/b6/bb/1f/b6bb1f98d48a1402a1b33c6a6da0c276.jpg" // Default fallback image URL
                          }
                          alt=""
                        />
                        <span className="px-4" style={{ fontWeight: "bold" }}>
                          {commentuser?.user_id?.username}
                        </span>
                        <p className="px-5">
                          {[...Array(commentuser.star)].map((_, index) => (
                            <FontAwesomeIcon
                              key={index}
                              icon={faStar}
                              style={{ color: "#FFD43B" }}
                            />
                          ))}
                        </p>
                        <p style={{ marginTop: "-20px", marginLeft: "50px" }}>
                          {" "}
                          {commentuser.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div>
                    {isComment && (
                      <>
                        {hasReviewed ? (
                          <>
                            <button
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              data-bs-whatever="@mdo"
                              className="p-1"
                              style={{
                                fontSize: "15px",
                                borderRadius: "10px",
                                background: "#ff8200f2",
                                color: "white",
                              }}
                            >
                              Cập nhật
                            </button>
                            <button
                              type="button"
                              className="p-1 mt-1 mx-2"
                              style={{
                                fontSize: "15px",
                                borderRadius: "10px",
                                marginLeft: "",
                                background: "#ff8200f2",
                                color: "white",
                              }}
                              onClick={handleDeleteComment}
                            >
                              Xóa đánh giá
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            data-bs-whatever="@mdo"
                            className="p-1"
                            style={{
                              fontSize: "15px",
                              borderRadius: "10px",
                              marginLeft: "",
                              background: "#ff8200f2",
                              color: "white",
                            }}
                          >
                            Viết đánh giá
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div>
                <div className="Details-Price-Quanlity mt-3">
                  <p>
                    <span className="price">
                      {product.price.toLocaleString()}đ
                    </span>
                  </p>
                  <p>
                    {product.quantity > 0 ? (
                      <span className="quanlity"> Sản phẩm còn hàng </span>
                    ) : (
                      <span className="quanlity"> Hết hàng </span>
                    )}
                  </p>
                </div>
                <div className="Details-Products mt-3">
                  <span style={{ fontWeight: "bold" }}> Mã sản phẩm:</span>
                  <span style={{ fontWeight: "0px" }}> {product._id}</span>
                  <p className="info mt-4">Thông tin cơ bản:</p>
                  <ul style={{ listStyleType: "circle" }}>
                    {product.description && <li>{product.description}</li>}
                    {product.aspectRatio && (
                      <li>Tỷ lệ khung hình: {product.aspectRatio}</li>
                    )}
                    {product.brightness && (
                      <li>Độ sáng: {product.brightness}</li>
                    )}
                    {product.card && <li>Card đồ họa: {product.card}</li>}
                    {product.caseTower && (
                      <li>Vỏ máy tính: {product.caseTower}</li>
                    )}
                    {product.color && <li>Màu sắc: {product.color}</li>}
                    {product.connectivity && (
                      <li>Kết nối: {product.connectivity}</li>
                    )}
                    {product.contrastRatio && (
                      <li>Tỷ lệ tương phản: {product.contrastRatio}</li>
                    )}
                    {product.cpu_type && <li>Loại cpu: {product.cpu_type}</li>}
                    {product.ergonomics && (
                      <li>Ergonomics: {product.ergonomics}</li>
                    )}
                    {product.graphics && <li>Đồ họa: {product.graphics}</li>}
                    {product.guarantee && (
                      <li>Bảo hành: {product.guarantee}</li>
                    )}
                    {product.hardDrive && <li>Ổ cứng: {product.hardDrive}</li>}
                    {product.hearType && (
                      <li>Loại tai nghe: {product.hearType}</li>
                    )}
                    {product.high && <li>Chiều cao: {product.high}</li>}
                    {product.keyboardType && (
                      <li>Loại bàn phím: {product.keyboardType}</li>
                    )}
                    {product.mainboard && (
                      <li>Mainboard: {product.mainboard}</li>
                    )}
                    {product.manufacturer && (
                      <li>Nhà sản xuất: {product.manufacturer}</li>
                    )}
                    {product.material && <li>Chất liệu: {product.material}</li>}
                    {product.model && <li>Model: {product.model}</li>}
                    {product.mouseType && (
                      <li>Loại chuột: {product.mouseType}</li>
                    )}
                    {product.mouse_keyboard && (
                      <li>Chuột bàn phím: {product.mouse_keyboard}</li>
                    )}
                    {product.other_features && (
                      <li>Tính năng khác: {product.other_features}</li>
                    )}
                    {product.psu && <li>Nguồn điện: {product.psu}</li>}
                    {product.panelType && (
                      <li>Loại panel: {product.panelType}</li>
                    )}
                    {product.radiators && (
                      <li>Bộ tản nhiệt: {product.radiators}</li>
                    )}
                    {product.ram && <li>Ram: {product.ram}</li>}
                    {product.recommendedResolution && (
                      <li>
                        Độ phân giải khuyến nghị:{" "}
                        {product.recommendedResolution}
                      </li>
                    )}
                    {product.refreshRate && (
                      <li>Tần số quét: {product.refreshRate}</li>
                    )}
                    {product.responseTime && (
                      <li>Thời gian phản hồi: {product.responseTime}</li>
                    )}
                    {product.screenSize && (
                      <li>Kích thước màn hình: {product.screenSize}</li>
                    )}
                    {product.screenType && (
                      <li>Loại màn hình: {product.screenType}</li>
                    )}
                    {product.size && <li>Kích thước: {product.size}</li>}
                    {product.specifications && (
                      <li>Thông số kỹ thuật: {product.specifications}</li>
                    )}
                    {product.viewingAngle && (
                      <li>Góc nhìn: {product.viewingAngle}</li>
                    )}
                    {product.warranty && <li>Bảo hành: {product.warranty}</li>}
                    {product.weight && <li>Trọng lượng: {product.weight}</li>}
                  </ul>
                </div>
                <div className="row text-center mt-4">
                  <div className="col-6">
                    <button
                      className="btn-details-left p-2 "
                      onClick={() => addCart(product._id)}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                  <div className="col-6 ">
                    <Link to={"/productsAll"}>
                      <button className="btn-details-right p-2">
                        Xem nhiều sản phẩm khác
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <p>
                    Gọi mua tại đây: <span className="tel">1234567890</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
      <ToastContainer />
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Viết đánh giá
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <p>Nhập số ngôi sao bạn muốn!</p>
                  <fieldset className="rating" onChange={handleRatingChange}>
                    <input type="radio" id="star5" name="rating" value={5} />
                    <label
                      className="full"
                      htmlFor="star5"
                      title="Awesome - 5 stars"
                    ></label>

                    <input type="radio" id="star4" name="rating" value={4} />
                    <label
                      className="full"
                      htmlFor="star4"
                      title="Pretty good - 4 stars"
                    ></label>

                    <input type="radio" id="star3" name="rating" value={3} />
                    <label
                      className="full"
                      htmlFor="star3"
                      title="Meh - 3 stars"
                    ></label>

                    <input type="radio" id="star2" name="rating" value={2} />
                    <label
                      className="full"
                      htmlFor="star2"
                      title="Kinda bad - 2 stars"
                    ></label>

                    <input type="radio" id="star1" name="rating" value={1} />
                    <label
                      className="full"
                      htmlFor="star1"
                      title="Sucks big time - 1 star"
                    ></label>
                  </fieldset>
                  <br />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Viết nội dung đánh giá.
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                    value={content}
                    onChange={handleContentChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmitComment}
                data-bs-dismiss="modal"
              >
                Gửi đánh giá
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
