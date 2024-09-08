import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-5">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-2 py-[2px] mx-1 border-2 border-gray-500 text-black rounded"
        >
          <i className="fa-solid fa-chevron-left text-[12px]"></i>
        </button>
      )}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-2 py-[2px] mx-1 ${
            number === currentPage
              ? "border-2 border-gray-500 text-[#414141]"
              : "border-2 border-gray-300 text-gray-300"
          } rounded`}
        >
          {number}
        </button>
      ))}
      {currentPage < totalPages || currentPage === 1 ? (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-2 py-[2px] mx-1 border-2 border-gray-500 text-black rounded"
        >
          <i className="fa-solid fa-chevron-right text-[12px]"></i>
        </button>
      ) : null}
    </div>
  );
}

export default Pagination;
