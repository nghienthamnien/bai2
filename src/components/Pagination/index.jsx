/* eslint-disable react/prop-types */
import "./index.css";

const Pagination = ({ limit, length, handlePagination, currentPage }) => {
  let paginationNumber = [];
  for (let i = 1; i <= Math.ceil(length / limit); i++) {
    paginationNumber.push(i);
  }
  return (
    <div className="pagination-container">
      {paginationNumber.map((data) => (
        <button
          key={data}
          onClick={() => handlePagination(data)}
          className={`page-button ${
            currentPage === data ? "pagination-active" : ""
          }`}
        >
          {data}
        </button>
      ))}
    </div>
  );
};
export default Pagination;
