import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Commons } from "~/Common/Commons";
import Loading from "~/components/Loading";
import Paginate from "~/components/Paginate";

import { deleteUser, getUser } from "~/services/userService";

function UserAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const deleteUserAdmin = (id) => {
    deleteUser({ id })
      .then((item) => {
        console.log(item);
        fetch();
      })
      .catch((error) => console.log(error));
  };

  const fetch = useCallback(() => {
    getUser({ page: currentPage, perPage: 10, fullName: search })
      .then((user) => {
        setData(user.data);
        setTotalPage(user.totalPage);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage, search]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="w-full px-10">
      <div className="flex justify-end my-4">
        <div className="w-1/3 flex items-center border border-gray-200 rounded-xl overflow-hidden">
          <input
            placeholder="Tìm kiếm theo tên"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 outline-none py-2"
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tài khoản
              </th>
              <th scope="col" className="px-6 py-3">
                Họ tên
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Số điện thoại
              </th>
              <th scope="col" className="px-6 py-3">
                Giới tính
              </th>
              <th scope="col" className="px-6 py-3">
                Ngày tạo
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr
                  key={item._id}
                  className="bg-white border-b hover:bg-gray-100 "
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item.username}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item.fullName}
                  </th>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.phone}</td>
                  <td className="px-6 py-4">
                    {item.gender === 0 ? "Nam" : "Nữ"}
                  </td>
                  <td className="px-6 py-4">
                    {Commons.formatTime(item.createdAt)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link
                      to={`/manager/user-edit/${item._id}`}
                      className="font-medium text-blue-600 hover:underline px-2"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => deleteUserAdmin(item._id)}
                      className="font-medium text-red-600 hover:underline px-2"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Paginate
        totalPage={totalPage}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
}

export default UserAdmin;
