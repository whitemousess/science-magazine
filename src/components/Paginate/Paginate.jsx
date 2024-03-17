import PropTypes from "prop-types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPaginate from "react-paginate";

function Paginate({ totalPage, handlePageChange, currentPage }) {
  return (
    <ReactPaginate
      pageCount={totalPage}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={handlePageChange}
      containerClassName={"pagination"}
      activeClassName={"underline"}
      previousLabel={currentPage === 1 ? null : <IoIosArrowBack />}
      nextLabel={currentPage >= totalPage ? null : <IoIosArrowForward />}
      className="flex justify-end mt-4"
      pageLinkClassName={"p-3"}
      pageClassName={"my-auto"}
      nextLinkClassName={"p-3"}
      previousLinkClassName={"p-3"}
      previousClassName={"my-auto"}
      nextClassName={"my-auto"}
      breakLinkClassName={"p-3"}
      breakClassName={"my-auto"}
    />
  );
}

Paginate.propTypes = {
  totalPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Paginate;
