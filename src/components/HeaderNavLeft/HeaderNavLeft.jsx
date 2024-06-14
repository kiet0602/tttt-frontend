import React, { useEffect, useState } from "react";
import "./HeaderNavLeft.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faArrowDownLong,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

const HeaderNavLeft = () => {
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    const getAccessories = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/accessory`);
        setAccessories(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAccessories();
  }, []);

  return (
    <div className="nav-left">
      <div className="text-center py-1 box-nav-left text-white">
        <span className="dropdown-hover">
          <FontAwesomeIcon className="px-2" icon={faList} />
          DANH MỤC SẢN PHẨM <FontAwesomeIcon icon={faArrowDownLong} />
        </span>
        <ul className="list-unstyled mb-0 child-div dropdown-menu dropdown-menu-left">
          {accessories?.map((accessory) => (
            <li key={accessory?._id} className="nav-item ">
              <Link
                to={"/"}
                className="nav-link text-link-navLeft py-2 px-3"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {accessory.name} <FontAwesomeIcon icon={faAngleDown} />
              </Link>
              <ul
                className="dropdown-menu child-link"
                style={{ width: "305px" }}
              >
                {accessory?.categories?.map((category) => (
                  <li key={category?.category_id}>
                    <Link
                      style={{ color: "black" }}
                      to={`/Category/${category?._id}`}
                      className="dropdown-item"
                    >
                      {category?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div className="box-list-nav-left">{/* Existing content */}</div>
    </div>
  );
};

export default HeaderNavLeft;
