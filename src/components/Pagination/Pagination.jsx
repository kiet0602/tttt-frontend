import React from "react";
import "./Pagination.css";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          className={currentPage === pageNumber ? "active" : ""}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      )}
    </div>
  );
};

export default Pagination;
