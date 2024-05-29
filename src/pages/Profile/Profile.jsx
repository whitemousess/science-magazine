import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import routes from "~/config/routes";
import { AuthContext } from "~/shared/AuthProvider";
import Avatar from "~/components/Avatar";
import { Commons } from "~/Common/Commons";
import { getCurrentUser } from "~/services/userService";
import { getArticlesActor } from "~/services/articlesService";
import { CiDatabase } from "react-icons/ci";
import Paginate from "~/components/Paginate";

function Profile() {
  const { currentUser, token, role } = useContext(AuthContext);
  const [toggle, setToggle] = useState(0);
  const [history, setHistory] = useState([]);
  const [dataArticles, setDataArticles] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (toggle === 0 && role === 2) {
      getArticlesActor({ id: currentUser._id, page: currentPage, perPage: 10 })
        .then((articles) => {
          setDataArticles(articles.data);
          setTotalPage(articles.totalPage);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (toggle === 1) {
      getCurrentUser()
        .then((currentUser) =>
          setHistory(currentUser.data.magazine_view.reverse())
        )
        .catch((error) => console.log(error));
    }
  }, [toggle, currentUser, currentPage]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-10">
      {token && (
        <>
          <div className="py-10 flex flex-col items-center justify-center">
            <Avatar
              src={currentUser.imageUrl}
              alt="avatar"
              className="w-[200px] h-[200px] rounded-full object-cover"
            />
            <Link
              to={routes.editProfile}
              className="bg-primary mt-4 text-white hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              Thay đổi thông tin
            </Link>
          </div>

          <div className="w-full px-52 mb-4 flex">
            <button
              onClick={() => setToggle(0)}
              className={`w-1/2 mx-2 border py-3 rounded ${
                toggle === 0 && "bg-primary/10 shadow-inner shadow-primary/20"
              }`}
            >
              Thông tin cá nhân
            </button>
            <button
              onClick={() => setToggle(1)}
              className={`w-1/2 mx-2 border py-3 rounded ${
                toggle === 1 && "bg-primary/10 shadow-inner shadow-primary/20"
              }`}
            >
              Bài viết đã xem
            </button>
          </div>

          {!toggle ? (
            <div className="w-2/3">
              <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
                <div className="bg-blue-200 px-4 py-2">Họ và tên</div>
                <div className="px-4 py-2">{currentUser.fullName}</div>
              </div>

              <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
                <div className="bg-blue-200 px-4 py-2">Email</div>
                <div className="px-4 py-2">{currentUser.email}</div>
              </div>

              <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
                <div className="bg-blue-200 px-4 py-2">Số điện thoại</div>
                <div className="px-4 py-2">{currentUser.phone || 0}</div>
              </div>

              <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
                <div className="bg-blue-200 px-4 py-2">Giới tính</div>
                <div className="px-4 py-2">
                  {currentUser.gender === 0 ? "Nam" : "Nữ"}
                </div>
              </div>

              {role === 2 && (
                <>
                  <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
                    <div className="bg-blue-200 px-4 py-2">
                      Tốt nghiệp tại trường
                    </div>
                    <div className="px-4 py-2">{currentUser.education}</div>
                  </div>

                  <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
                    <div className="bg-blue-200 px-4 py-2">Địa chỉ</div>
                    <div className="px-4 py-2">
                      {currentUser.districts} - {currentUser.province}
                    </div>
                  </div>

                  <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
                    <div className="bg-blue-200 px-4 py-2">Số điện thoại</div>
                    <div className="px-4 py-2">{currentUser.phone || 0}</div>
                  </div>

                  <div className="border border-blue-200 rounded-[5px] mb-2">
                    <div className="bg-blue-200 px-4 py-2">Mô tả</div>
                    <div className="px-4 py-2 break-words">
                      {currentUser.biography}
                    </div>
                  </div>
                  {dataArticles && dataArticles.length > 0 ? (
                    <div className="w-full bg-gray-100 p-4 rounded-xl shadow-black/15 shadow-inner">
                      <p className="py-10 text-2xl text-center font-bold">
                        Bài viết đã đăng
                      </p>
                      {dataArticles.map((item) => (
                        <Link
                          to={`/articles/${item._id}`}
                          key={item._id}
                          className="flex bg-white rounded-xl my-5"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-40 h-auto"
                          />
                          <div className="m-4 relative w-full">
                            <p className="">{item.title}</p>
                            <p className="">{item.userId.fullName}</p>
                            <p className="absolute bottom-0 right-0">
                              {` Ngày ${Commons.formatTimeDay(
                                item.createdAt
                              )} tháng ${Commons.formatTimeMonth(
                                item.createdAt
                              )} năm ${Commons.formatTimeYear(item.createdAt)}`}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center h-full">
                      <CiDatabase size={100} />
                      <p className="">Chưa có bài báo nào?</p>
                    </div>
                  )}

                  <Paginate
                    totalPage={totalPage}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                  />
                </>
              )}
            </div>
          ) : (
            <div className="w-8/12 bg-gray-100 p-4 rounded-xl shadow-black/15 shadow-inner">
              {history.map((item) => (
                <Link
                  to={`/magazine/${item.magazineId._id}`}
                  key={item._id}
                  className="flex bg-white rounded-xl my-5"
                >
                  <img
                    src={item?.magazineId?.imageUrl}
                    alt={item?.magazineId?.title}
                    className="w-40 h-auto"
                  />
                  <div className="m-4 relative w-full">
                    <p className="">{item?.magazineId?.title}</p>
                    <p>
                      {` Ngày ${Commons.formatTimeDay(
                        item?.magazineId?.createdAt
                      )} tháng ${Commons.formatTimeMonth(
                        item?.magazineId?.createdAt
                      )} năm ${Commons.formatTimeYear(
                        item?.magazineId?.createdAt
                      )}`}
                    </p>
                    <p>Bản phát hành số : {item?.magazineId.versionPublish}</p>
                    <div className="w-full flex justify-between absolute bottom-0">
                      <p>Được xuất bản bởi trường đại học ...</p>
                      <p>Xem ngày: {Commons.formatTime(item.monthYear)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Profile;
