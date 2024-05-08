import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "~/components/Modal";
import Paginate from "~/components/Paginate";
import routes from "~/config/routes";
import {
  editMagazine,
  getAllMagazine,
  deleteMagazine,
} from "~/services/magazineService";
import { Commons } from "~/Common/Commons";

function MagazineAdmin() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [magazineId, setMagazineId] = useState("");

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const onDelete = () => {
    deleteMagazine({ id: magazineId })
      .then((magazine) => {
        if (magazine.data) {
          fetchData();
          setShowModal(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const fetchData = useCallback(() => {
    getAllMagazine({ page: currentPage, perPage: 10, title: search })
      .then((magazines) => {
        setTotalPage(magazines.totalPages);
        setData(magazines.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage, search]);

  const onPublish = (id) => {
    editMagazine({
      id,
      data: { status: 1, publishingYear: new Date() },
    })
      .then(() => fetchData())
      .catch((err) => console.log(err));
  };

  const onSubmit = () => {
    onDelete();
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
        <table className="w-full text-nowrap text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tiêu đề
              </th>
              <th scope="col" className="px-6 py-3">
                Thể loại
              </th>
              <th scope="col" className="px-6 py-3">
                Ngày xuất bản
              </th>
              <th scope="col" className="px-6 py-3">
                Thời gian đăng
              </th>
              <th scope="col" className="px-6 py-3">
                Tình trạng
              </th>
              <th></th>
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
                    className="px-6 py-4 font-medium text-gray-900 w-96"
                  >
                    {item.title}
                  </th>
                  <td className="px-6 py-4">{item.type}</td>
                  <td className="px-6 py-4">
                    {item.status
                      ? Commons.formatTime(item.publishingYear)
                      : "Chưa xuất bản"}
                  </td>
                  <td className="px-6 py-4">
                    {Commons.formatTime(item.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    {item.status ? (
                      "Đã xuất bản"
                    ) : (
                      <button
                        onClick={() => onPublish(item._id)}
                        className="bg-green-600 text-white px-3 py-2 rounded"
                      >
                        Xuất bản
                      </button>
                    )}
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() =>
                        navigate(routes.newMagazine, {
                          state: { status: "Edit", dataMagazine: item },
                        })
                      }
                      className="font-medium text-green-600  hover:underline px-2"
                    >
                      Sửa
                    </button>
                  </td>
                  <td className="text-right">
                    <button
                      className="font-medium text-red-600  hover:underline px-2"
                      onClick={() => {
                        setShowModal(true);
                        setMagazineId(item._id);
                      }}
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

      <Modal
        showModal={showModal}
        title="Bạn có chắc muốn xóa"
        onClose={() => setShowModal(false)}
        onSubmit={onSubmit}
        description="Bạn có chắc muốn xóa"
      />

      <Paginate
        totalPage={totalPage}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
}

export default MagazineAdmin;
