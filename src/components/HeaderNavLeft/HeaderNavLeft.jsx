import React, { useEffect, useState } from "react";
import "./HeaderNavLeft.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faArrowDownLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

const HeaderNavLeft = () => {
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    const getAccessories = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/accessory`);
        setAccessories(data);
        console.log(data);
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
        <ul className="list-unstyled mb-0 child-div dropdown-menu dropdown-menu-left">
          {accessories?.map((accessory) => (
            <li key={accessory?._id} className="nav-item dropdown">
              <Link
                to={"/"}
                className="nav-link dropdown-toggle text-link-navLeft py-2 px-3"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {accessory.name}
              </Link>
              <div className="dropdown-menu child-link">
                {accessory?.categories?.map((category) => (
                  <Link
                    key={category?.category_id}
                    to={`/Category/${category?._id}`}
                    className="dropdown-item"
                  >
                    {category?.name}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="box-list-nav-left">{/* Existing content */}</div>
    </div>
  );
};

export default HeaderNavLeft;
