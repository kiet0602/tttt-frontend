import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";
import Header from "../../components/Header/Header";
import BlockTitle from "../../components/BlockTitle/BlockTitle";
import { ToastContainer, toast } from "react-toastify";

const ProductAll = () => {
  const [productsData, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State cho giá trị của input search

  const addCart = (productId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const userId = userInfo._id;
      const res = axios.post("http://localhost:8000/api/cart", {
        userId,
        productId,
        quantity: 1,
      });
      toast.success("Đã thêm sản phẩm vào giỏ hàng thành công!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getProductsAll = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/product`);
        let filteredProducts = response.data.data.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.log(error);
      }
    };
    getProductsAll();
  }, [searchTerm]);

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <HeadNavNoBanNer />

      <div className="container mt-4">
        <div className="row">
          {productsData.length === 0 ? (
            <p className="text-center test-bold">
              {" "}
              <img src="" alt="" />
              Không có sản phẩm nào được tìm thấy.
            </p>
          ) : (
            productsData.map((product) => (
              <div className="col-3 box-product mt-1" key={product.id}>
                <div className="text-center">
                  <img
                    className="img-fluid"
                    src={`http://localhost:8000/${product.image}`}
                    alt=""
                  />
                  <span className="text-center">
                    {product.name.substring(0, 40)}...
                  </span>
                  <br />
                  {/*         <span className="text-center">
                    Loại: {product.category_id?.name?.substring(0, 30)}
                  </span> */}
                  <p
                    style={{
                      color: "red",
                      fontSize: "20px",
                      fontWeight: "bolder",
                    }}
                  >
                    {product.price.toLocaleString()} VND
                  </p>
                  <button
                    style={{
                      border: "none",
                      backgroundColor: "blue",
                      borderRadius: "30px",
                      marginBottom: "15px",
                      color: "white",
                      padding: "10px",
                    }}
                    onClick={() => addCart(product._id)}
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProductAll;
