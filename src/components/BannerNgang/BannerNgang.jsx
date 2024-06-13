import React from "react";
import baner1 from "../../assets/img/banner_home_1_master.webp";
import baner2 from "../../assets/img/banner_home_2_master.webp";
import baner3 from "../../assets/img/banner_home_3_master.webp";
import baner4 from "../../assets/img/banner_home_4_master.webp";

const BannerNgang = () => {
  return (
    <div className="container mb-4 mt-2">
      <div className="row">
        <div className="col-3">
          <img style={{ width: "310px" }} src={baner1} alt="" />
        </div>
        <div className="col-3">
          <img style={{ width: "310px" }} src={baner2} alt="" />
        </div>
        <div className="col-3">
          <img style={{ width: "310px" }} src={baner3} alt="" />
        </div>
        <div className="col-3">
          <img style={{ width: "310px" }} src={baner4} alt="" />
        </div>
      </div>
    </div>
  );
};

export default BannerNgang;
