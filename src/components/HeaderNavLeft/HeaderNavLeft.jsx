import React, { useEffect, useState } from "react";
import "./HeaderNavLeft.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

const HeaderNavLeft = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/product`);
        setProducts(data);
        console.log(data);
        // Extract unique categories
        const uniqueCategories = [
          ...new Set(data.map((product) => product.category_id)),
        ];
        console.log(uniqueCategories);
        setCategories(uniqueCategories);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProducts();
  }, []);

  return (
    <div className="nav-left">
      <div className="text-center py-1 box-nav-left ">
        <FontAwesomeIcon className="px-2" icon={faList} />
        <span>DANH MỤC SẢN PHẨM</span>
      </div>
      <div className="box-list-nav-left">
        <ul className="box-nav-left2 list-nav-left  ">
          {categories.map((category) => (
            <div
              className="text-center py-1 box-item-li-navLeft  "
              key={category}
            >
              <li>
                <Link className="text-link-navLeft">{category}</Link>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeaderNavLeft;
