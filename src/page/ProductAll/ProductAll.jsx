import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import HeadNavNoBanNer from "../../components/HeaderNavNOBANNER/HeadNavNoBanNer";
import Header from "../../components/Header/Header";
import BlockTitle from "../../components/BlockTitle/BlockTitle";

const ProductAll = () => {
  const [productsData, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State cho giá trị của input search

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
      <BlockTitle title={`Từ khóa tìm kiếm: ${searchTerm}`} />
      <div className="container mt-4">
        <div className="row">
          {productsData.length === 0 ? (
            <p>Không có sản phẩm nào được tìm thấy.</p>
          ) : (
            productsData.map((product) => (
              <div className="col-3 box-product mt-1" key={product.id}>
                <div className="text-center">
                  <img
                    className="img-fluid"
                    src={`http://localhost:8000/${product.image}`}
                    alt=""
                  />
                  <span className="text-center">{product.name}</span> <br />
                  <span className="text-center">
                    Loại: {product.category_id.name}
                  </span>
                  <p>{product.price.toLocaleString()} VND</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProductAll;
