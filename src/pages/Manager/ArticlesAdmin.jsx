import { useCallback, useEffect, useState } from "react";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";

import Paginate from "~/components/Paginate";
import {
  deleteArticles,
  editArticles,
  getAllArticles,
} from "~/services/articlesService";

function ArticlesAdmin() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleDateString();
  };

  const deleteArticle = (id) => {
    deleteArticles({ id })
      .then(() => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchData = useCallback(() => {
    getAllArticles({ page: currentPage, perPage: 10, title: search })
      .then((articles) => {
        setData(articles.data);
        setTotalPage(articles.totalPage);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage, search]);

  const onSubmit = ({ id }) => {
    editArticles({ id, data: { status: 1 } })
      .then((articles) => {
        fetchData();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
          <thead className="text-xs text-gray-700 uppercase text-nowrap bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tiêu đề
              </th>
              <th scope="col" className="px-6 py-3">
                Người đăng
              </th>
              <th scope="col" className="px-6 py-3">
                Tạp chí số
              </th>
              <th scope="col" className="px-6 py-3">
                Thời gian
              </th>
              <th scope="col" className="px-6 py-3">
                Trạng thái
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
                    className="px-6 py-4 font-medium text-gray-900 max-w-full"
                  >
                    {item.title}
                  </th>
                  <td className="px-6 py-4 text-nowrap">
                    {item.userId.fullName || "Trường đại học"}
                  </td>
                  <td className="px-6 py-4 text-nowrap">
                    {item.magazineId.versionPublish || "Chưa xuất bản"}
                  </td>
                  <td className="px-6 py-4">{formatTime(item.createdAt)}</td>
                  <td className="px-6 py-4 text-nowrap">
                    {item.status ? "Đã dăng" : "Chưa đăng"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex">
                      <Link
                        to={`/articles/edit/${item._id}`}
                        className="font-medium text-green-600  hover:underline px-2"
                      >
                        <FaEye />
                      </Link>
                      {!item.status && (
                        <button
                          className="font-medium text-green-600  hover:underline px-2"
                          onClick={() => onSubmit({ id: item._id })}
                        >
                          <FaCircleCheck />
                        </button>
                      )}
                      <button
                        className="font-medium text-red-600  hover:underline px-2"
                        onClick={() => deleteArticle(item._id)}
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
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

export default ArticlesAdmin;
