import React, { useState } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const PaginationExample = ({ e }) => {
  const { data, itemsPerPage } = e;
  const { category, numberOfRecords } = e;
  console.log(category);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(data);
  console.log(itemsPerPage);
  // Calculate total number of pages
  const totalPages = Math.ceil(category.length / numberOfRecords);

  // Slice data based on current page and items per page
  const startIndex = (currentPage - 1) * numberOfRecords;
  const endIndex = startIndex + numberOfRecords;
  const currentData = category.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Render current data */}
      {console.log(currentData)}
      {currentData.map((item, index) => {
        return (
          <div className="check">
            <input type="checkbox" style={{ width: "17px" }} />
            <label htmlFor="" style={{ lineHeight: "28px", fontSize: "14px" }}>
              {item}
            </label>
          </div>
        );
      })}
      {/* Pagination controls */}
      <div className="page">
        <KeyboardDoubleArrowLeftIcon
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <a
            id={index + 1}
            key={index}
            style={{
              fontWeight: currentPage === index + 1 ? "bold" : "normal",
            }}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </a>
        ))}
        <KeyboardDoubleArrowRightIcon
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
};

export default PaginationExample;
