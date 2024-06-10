import React, { useEffect, useState } from "react";
import "./ProductsDetail.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import imgPC from "../../assets/img/pc.png";
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
        console.log(data.data);
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
                  <p>Đánh giá sản phẩm</p>
                  {[...Array(product.average_star)].map((_, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={faStar}
                      style={{ color: "#FFD43B" }}
                    />
                  ))}
                  <p>Dựa trên {product.comment_count} đánh giá</p>
                  <hr />
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
                        <p style={{ width: "500px" }}>{commentuser.content}</p>
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
                              style={{ fontSize: "15px", borderRadius: "10px" }}
                            >
                              <FontAwesomeIcon
                                icon={faComment}
                                style={{ color: "#FFD43B" }}
                              />
                              Cập nhật
                            </button>
                            <button
                              type="button"
                              className="p-1 mt-1 mx-2"
                              style={{
                                fontSize: "15px",
                                borderRadius: "10px",
                                marginLeft: "",
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
                            style={{ fontSize: "15px", borderRadius: "10px" }}
                          >
                            <FontAwesomeIcon
                              icon={faComment}
                              style={{ color: "#FFD43B" }}
                            />
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
                    Giá bán:{" "}
                    <span className="price">
                      {product.price.toLocaleString()}VND
                    </span>
                  </p>
                  <p>
                    Số lượng còn lại:{" "}
                    <span className="quanlity"> {product.quantity}</span>
                  </p>
                </div>
                <div className="Details-Products mt-3">
                  <p>Mã sản phẩm: {product._id}</p>
                  <p className="info">Thông tin cơ bản:</p>
                  {product.description && <p>{product.description}</p>}
                  {product.aspectRatio && (
                    <p>Tỷ lệ khung hình: {product.aspectRatio}</p>
                  )}
                  {product.brightness && <p> Độ sáng: {product.brightness}</p>}
                  {product.card && <p> Card đồ họa: {product.card}</p>}
                  {product.caseTower && (
                    <p> Vỏ máy tính: {product.caseTower}</p>
                  )}
                  {product.color && <p> Màu sắc: {product.color}</p>}
                  {product.connectivity && (
                    <p> Kết nối: {product.connectivity}</p>
                  )}
                  {product.contrastRatio && (
                    <p> Tỷ lệ tương phản: {product.contrastRatio}</p>
                  )}
                  {product.cpu_type && <p> Loại cpu: {product.cpu_type}</p>}
                  {product.ergonomics && (
                    <p> Ergonomics: {product.ergonomics}</p>
                  )}
                  {product.graphics && <p> Đồ họa: {product.graphics}</p>}
                  {product.guarantee && <p> Bảo hành: {product.guarantee}</p>}
                  {product.hardDrive && <p> Ổ cứng: {product.hardDrive}</p>}
                  {product.hearType && <p>Loại tai nghe: {product.hearType}</p>}
                  {product.high && <p> Chiều cao: {product.high}</p>}
                  {product.keyboardType && (
                    <p> Loại bàn phím: {product.keyboardType}</p>
                  )}
                  {product.mainboard && <p> Mainboard: {product.mainboard}</p>}
                  {product.manufacturer && (
                    <p> Nhà sản xuất: {product.manufacturer}</p>
                  )}
                  {product.material && <p> Chất liệu: {product.material}</p>}
                  {product.model && <p> Model: {product.model}</p>}
                  {product.mouseType && <p> Loại chuột: {product.mouseType}</p>}
                  {product.mouse_keyboard && (
                    <p> Chuột bàn phím: {product.mouse_keyboard}</p>
                  )}
                  {product.other_features && (
                    <p> Tính năng khác: {product.other_features}</p>
                  )}
                  {product.psu && <p> Nguồn điện: {product.psu}</p>}
                  {product.panelType && <p> Loại panel: {product.panelType}</p>}
                  {product.radiators && (
                    <p> Bộ tản nhiệt: {product.radiators}</p>
                  )}
                  {product.ram && <p> Ram: {product.ram}</p>}
                  {product.recommendedResolution && (
                    <p>
                      {" "}
                      Độ phân giải khuyến nghị: {product.recommendedResolution}
                    </p>
                  )}
                  {product.refreshRate && (
                    <p> Tần số quét: {product.refreshRate}</p>
                  )}
                  {product.responseTime && (
                    <p> Thời gian phản hồi: {product.responseTime}</p>
                  )}
                  {product.screenSize && (
                    <p> Kích thước màn hình: {product.screenSize}</p>
                  )}
                  {product.screenType && (
                    <p> Loại màn hình: {product.screenType}</p>
                  )}
                  {product.size && <p> Kích thước : {product.size}</p>}
                  {product.specifications && (
                    <p>Thông số kỹ thuật: {product.specifications}</p>
                  )}
                  {product.viewingAngle && (
                    <p> Góc nhìn: {product.viewingAngle}</p>
                  )}
                  {product.warranty && <p> Bảo hành: {product.warranty}</p>}
                  {product.weight && <p> Trọng lượng: {product.weight}</p>}
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
