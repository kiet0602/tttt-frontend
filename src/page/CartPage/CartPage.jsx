import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";
import { Link } from "react-router-dom";
import "./CartPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const CartPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo._id;

  const [quantities, setQuantities] = useState({});

  const getProductsAll = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/cart/${userId}`
      );
      setProducts(response.data.data.items);
      const newQuantities = response.data.data.items.reduce((acc, product) => {
        acc[product.product_id._id] = product.quantity;
        return acc;
      }, {});
      setQuantities(newQuantities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsAll();
  }, []);

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

  const inCrease = (productId) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        productId: prevQuantities[productId] + 1,
      };
      updateProductItemCart(newQuantities.productId, productId);
      return newQuantities;
    });
  };

  const deCrease = (productId) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [productId]: Math.max(prevQuantities[productId] - 1, 0),
      };
      updateProductItemCart(newQuantities[productId], productId);
      return newQuantities;
    });
  };

  const removeProductItemCart = async (productId) => {
    console.log(productId, userId);
    try {
      await axios.delete("http://localhost:8000/api/cart", {
        data: {
          userId,
          productId,
        },
      });
      getProductsAll();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <HeadNavNoBanNer />
      <div className="container">
        <p className="fs-1">Giỏ hàng</p>
        <div className="row">
          <div className="col-8 ">
            <table className="table table-white">
              <thead
                className="boxx"
                style={{ textAlign: "center", textAlignLast: "center" }}
              >
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
                    className=""
                    style={{ textAlign: "center", textAlignLast: "center" }}
                    key={product.product_id._id}
                  >
                    <td>
                      <Link to={`/product/${product.product_id._id}`}>
                        <img
                          style={{ width: "100px" }}
                          src={`http://localhost:8000/${product.product_id.image}`}
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
                      <button onClick={() => deCrease(product.product_id._id)}>
                        -
                      </button>
                      {quantities[product.product_id._id]}
                      <button onClick={() => inCrease(product.product_id._id)}>
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
                        className="delete-cart"
                        style={{ cursor: "pointer" }}
                        icon={faTrash}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        className="payment-card"
                        style={{ cursor: "pointer" }}
                        icon={faBasketShopping}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-4">
            <div className="d-flex justify-content-between">
              <div>Tổng</div>
              <div className="SumPayment-cart">10,999,999</div>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <div>
                <button className="btn-back-allProducts">
                  Tiếp tục mua sắm
                </button>
              </div>
              <div>
                <button className="btn-Payment">Thanh toán</button>
              </div>
            </div>
            <div className=" justify-content-between">
              <div className="mt-5">
                <span>MUA TRẢ GÓP THEO THẺ TÍN DỤNG</span>
              </div>
              <div className="mt-2">
                <ul>
                  <li>Ấn Thanh Toán, nhập thông tin</li>
                  <li>
                    Chọn hình thức: Thanh toán thẻ - Trả góp. Lưu ý: LH nhân
                    viên để kiểm tra tồn kho sản phẩm trước khi thanh toán
                  </li>
                  <li>
                    Chọn loại thẻ phù hợp với nhu cầu, nhập thông tin, sau đó
                    tiến hành thanh toán
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </>
  );
};

export default CartPage;
