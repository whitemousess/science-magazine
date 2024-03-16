import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPaginate from "react-paginate";
import Loading from "~/components/Loading";

import * as userService from "~/services/userService";

function UserAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [data, setData] = useState([]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const fetch = () => {
    userService
      .getUser()
      .then((user) => {
        setData(user.data);
        setTotalPage(user.totalPage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  if(!data){
    return (
      <Loading/>
    )
  }

  return (
    <div className="w-full px-10">
      <div className="flex justify-end my-4">
        <div className="w-1/3 flex items-center border border-gray-200 rounded-xl overflow-hidden">
          <input
            placeholder="Search ..."
            className="w-full pl-4 outline-none"
          />

          <CiSearch className="cursor-pointer w-10 h-10 p-2" color="#ccc" />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Họ tên
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Giới tính
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b hover:bg-gray-100 "
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {item.fullName}
                </th>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">
                  {item.gender === 0 ? "Nam" : "Nữ"}
                </td>
                <td className="py-4 px-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline px-2"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 hover:underline px-2"
                  >
                    Xóa
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
    </div>
  );
}

export default UserAdmin;
