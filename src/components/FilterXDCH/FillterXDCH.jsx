import React from "react";

const FillterXDCH = ({
  nameCategory,
  selectedBand,
  setSelectedBand,
  selectedCapacity,
  setSelectedCapacity,
  selectedColor,
  setSelectedColor,
}) => {
  const handleCheckboxColor = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedColor(value);
    } else {
      setSelectedColor("");
    }
  };

  const handleCheckboxCapacity = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedCapacity(value);
    } else {
      setSelectedCapacity("");
    }
  };

  const handleCheckboxBrand = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedBand(value);
    } else {
      setSelectedBand("");
    }
  };

  const renderCategory = () => {
    if (nameCategory === "SSD") {
      return (
        <div>
          <div className="text-center" style={{ fontWeight: "bolder" }}>
            Nhà sản xuất
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="manufacturer"
                    value="Crucial"
                    checked={selectedBand === "Crucial"}
                    onChange={handleCheckboxBrand}
                  />
                  <span className="px-2">Crucial</span>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="manufacturer"
                    value="Samsung"
                    checked={selectedBand === "Samsung"}
                    onChange={handleCheckboxBrand}
                  />
                  <span className="px-2">Samsung</span>
                </label>
              </div>
            </div>
            <div className="col-6">
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="manufacturer"
                    value="Seagate"
                    checked={selectedBand === "Seagate"}
                    onChange={handleCheckboxBrand}
                  />
                  <span className="px-2">Seagate</span>
                </label>
              </div>
            </div>
          </div>
          <div className="text-center" style={{ fontWeight: "bolder" }}>
            Dung lượng
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="ram"
                    value="4 TB"
                    checked={selectedCapacity === "4 TB"}
                    onChange={handleCheckboxCapacity}
                  />
                  <span className="px-2">4 TB</span>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="ram"
                    value="8 GB"
                    checked={selectedCapacity === "8 GB"}
                    onChange={handleCheckboxCapacity}
                  />
                  <span className="px-2">8 TB</span>
                </label>
              </div>

              <div>
                <label>
                  <input
                    type="checkbox"
                    name="ram"
                    value="1 TB"
                    checked={selectedCapacity === "1 TB"}
                    onChange={handleCheckboxCapacity}
                  />
                  <span className="px-2">1 TB</span>
                </label>
              </div>
            </div>
            <div className="col-6">
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="ram"
                    value="2 TB"
                    checked={selectedCapacity === "2 TB"}
                    onChange={handleCheckboxCapacity}
                  />
                  <span className="px-2">2 TB</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (nameCategory === "HDD") {
      return (
        <div>
          <div className="text-center" style={{ fontWeight: "bolder" }}>
            Nhà sản xuất
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="manufacturer"
                    value="Toshiba"
                    checked={selectedBand === "Toshiba"}
                    onChange={handleCheckboxBrand}
                  />
                  <span className="px-2">Toshiba</span>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="manufacturer"
                    value="Western Digital"
                    checked={selectedBand === "Western Digital"}
                    onChange={handleCheckboxBrand}
                  />
                  <span className="px-2">Western Digital</span>
                </label>
              </div>
            </div>
            <div className="col-6">
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="manufacturer"
                    value="Seagate"
                    checked={selectedBand === "Seagate"}
                    onChange={handleCheckboxBrand}
                  />
                  <span className="px-2">Seagate</span>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="manufacturer"
                    value="Synology"
                    checked={selectedBand === "Synology"}
                    onChange={handleCheckboxBrand}
                  />
                  <span className="px-2">Synology</span>
                </label>
              </div>
            </div>
          </div>
          <div className="text-center" style={{ fontWeight: "bolder" }}>
            Dung lượng
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="ram"
                    value="6 TB"
                    checked={selectedCapacity === "6 TB"}
                    onChange={handleCheckboxCapacity}
                  />
                  <span className="px-2">6 TB</span>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="ram"
                    value="10 TB"
                    checked={selectedCapacity === "10 TB"}
                    onChange={handleCheckboxCapacity}
                  />
                  <span className="px-2">10 TB</span>
                </label>
              </div>
            </div>
            <div className="col-6">
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="ram"
                    value="8 TB"
                    checked={selectedCapacity === "8 TB"}
                    onChange={handleCheckboxCapacity}
                  />
                  <span className="px-2">8 TB</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (
      nameCategory === "Laptop ACER" ||
      nameCategory === "Laptop MSI" ||
      nameCategory === "Laptop ASUS" ||
      nameCategory === "Laptop LENOVO" ||
      nameCategory === "Laptop HP" ||
      nameCategory === "Laptop GIGABYTE" ||
      nameCategory === "Laptop DELL"
    ) {
      return (
        <div>
          {" "}
          <div className="text-center" style={{ fontWeight: "bolder" }}>
            Màu sắc
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="manufacturer"
                    value="Black"
                    checked={selectedColor === "Black"}
                    onChange={handleCheckboxColor}
                  />
                  <span className="px-2">Đen</span>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="manufacturer"
                    value="White"
                    checked={selectedColor === "White"}
                    onChange={handleCheckboxColor}
                  />
                  <span className="px-2">Trắng</span>
                </label>
              </div>
            </div>
            <div className="col-6">
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="manufacturer"
                    value="Blue"
                    checked={selectedColor === "Blue"}
                    onChange={handleCheckboxColor}
                  />
                  <span className="px-2">Xanh</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>{nameCategory}</div>;
    }
  };

  return (
    <div>
      <div>{renderCategory()}</div>
    </div>
  );
};

export default FillterXDCH;
