import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const XDCHImgmodel = ({ selectedProducts }) => {
  const modalRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  const handleUnderstoodClick = () => {
    if (!modalRef.current) return;

    if (!imagesLoaded) {
      alert("Images are still loading. Please wait.");
      return;
    }

    // Đảm bảo modal có thể hiển thị đầy đủ nội dung
    modalRef.current.style.maxHeight = "none";
    modalRef.current.style.overflow = "visible";

    // Sử dụng HTML2Canvas để chụp nội dung của modal
    html2canvas(modalRef.current).then((canvas) => {
      // Lấy dữ liệu ảnh từ canvas
      const imageData = canvas.toDataURL();

      // Tạo một đường dẫn tạm thời để tải xuống ảnh
      const downloadLink = document.createElement("a");
      downloadLink.href = imageData;
      downloadLink.download = "screenshot.png";
      document.body.appendChild(downloadLink); // Thêm link vào body để tránh lỗi trong một số trình duyệt
      downloadLink.click();
      document.body.removeChild(downloadLink); // Sau khi click xong, xóa link đi

      // Khôi phục lại trạng thái ban đầu của modal
      modalRef.current.style.maxHeight = "";
      modalRef.current.style.overflow = "";
    });
  };

  return (
    <div>
      <div className="text-center mt-4">
        <button
          style={{ background: "red" }}
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Xem cấu hình đã xây dựng
        </button>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        ref={modalRef} // Thêm ref vào modal để truy cập nội dung của nó
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Cấu hình đã xây
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedProducts.length === 0 ? (
                <p>Bạn không có sản phẩm nào mà bạn đã xây.</p>
              ) : (
                selectedProducts.map((selectedProduct, idx) => (
                  <div className="col-12 my-2" key={idx}>
                    <div className="row">
                      <div className="col-2">
                        <img
                          style={{ width: "150px" }}
                          src={`http://localhost:8000/${selectedProduct.image}`}
                          alt={selectedProduct.name}
                          onLoad={handleImageLoad}
                        />
                      </div>
                      <div className="col-10 px-5">
                        <p style={{ fontWeight: "bold" }}>
                          Tên sản phẩm: {selectedProduct.name}
                        </p>
                        <p style={{ color: "red" }}>
                          Giá: {selectedProduct.price.toLocaleString()}đ
                        </p>
                        <p>Mã sản phẩm: {selectedProduct._id}</p>
                        <div className="d-flex align-items-center">
                          Số lượng: {selectedProduct.quantity}
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                ))
              )}
            </div>
            <div className="modal-footer">
              <button
                style={{ background: "red" }}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Tiếp tục xây dựng
              </button>
              <button
                style={{ background: "red" }}
                type="button"
                className="btn btn-primary"
                onClick={handleUnderstoodClick}
              >
                <FontAwesomeIcon icon={faImage} style={{ color: "#ffffff" }} />
                Tải ảnh
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XDCHImgmodel;
