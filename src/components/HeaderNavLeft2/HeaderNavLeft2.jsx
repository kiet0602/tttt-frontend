import React, { useEffect, useState } from "react";
import "./HeaderNavLeft2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faArrowDownLong,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

const HeaderNavLeft2 = () => {
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
        <FontAwesomeIcon className="px-2" icon={faList} />
        <span>
          DANH MỤC SẢN PHẨM <FontAwesomeIcon icon={faArrowDownLong} />
        </span>
        <ul
          className="list-unstyled mb-0 mt-2 text-start"
          style={{ background: "white", zIndex: "1" }}
        >
          {accessories?.map((accessory, index) => (
            <li key={accessory?._id} className="nav-item ">
              <span
                className="nav-link dropdown-toggle text-link-navLeft py-2 px-3"
                role="button"
                id={`dropdown-${index}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {accessory.name}
              </span>
              <ul
                className="dropdown-menu child-link"
                aria-labelledby={`dropdown-${index}`}
              >
                {accessory?.categories?.map((category) => (
                  <li key={category?.category_id}>
                    <Link
                      to={`/Category/${category?._id}`}
                      className="dropdown-item text-link-navLeft"
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

export default HeaderNavLeft2;
