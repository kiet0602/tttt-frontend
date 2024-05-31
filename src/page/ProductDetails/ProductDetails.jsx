import React, { useEffect, useState } from "react";
import "./ProductsDetail.css";
import { Link, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import imgPC from "../../assets/img/pc.png";
import HeaderNav from "../../components/header_nav/HeaderNav";

const ProductDetails = () => {
  const [product, setProduct] = useState("");

  const { id } = useParams();
  useEffect(() => {
    const getProductById = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/product/${id}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductById();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="container">
        {product && (
          <>
            <div className="d-flex justify-content-between box-title text-center ">
              <span className=" text-end text-title-regorogy">
                {product.name}
              </span>
            </div>
            <div className="row">
              <div className="col-6">
                <div>
                  <img src={imgPC} alt="" />
                </div>
              </div>

              <div className="col-6">
                <div>
                  <div className="Details-Price-Quanlity mt-3">
                    <p className="">
                      Giá bán: <span className="price">{product.price}đ</span>
                    </p>
                    <p>
                      Số lượng còn lại:{" "}
                      <span className="quanlity"> {product.quantity}</span>
                    </p>
                  </div>
                  <div className="Details-Products mt-3">
                    <p>Mã sản phẩm: {product.id}</p>
                    <p className="info">Thông tin cơ bản:</p>
                    <p>{product.description}</p>
                  </div>
                  <div className="row text-center mt-4">
                    <div className="col-6">
                      <button className="btn-details-left p-2">
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
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
