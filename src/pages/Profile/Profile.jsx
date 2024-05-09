import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import routes from "~/config/routes";
import { AuthContext } from "~/shared/AuthProvider";
import Avatar from "~/components/Avatar";
import { Commons } from "~/Common/Commons";
import { getCurrentUser } from "~/services/userService";

function Profile() {
  const { currentUser, token } = useContext(AuthContext);
  const [toggle, setToggle] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (toggle === 1) {
      getCurrentUser()
        .then((currentUser) => setHistory(currentUser.data.magazine_view))
        .catch((error) => console.log(error));
    }
  }, [toggle]);

  document.title = "Trang cá nhân";

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
            </div>
          ) : (
            <div className="w-8/12 bg-gray-100 p-4 rounded-xl shadow-black/15 shadow-inner">
              {history.map((item) => (
                <Link
                  to={`/articles/${item?.magazineId?._id}`}
                  key={item?.magazineId?._id}
                  className="flex bg-white rounded-xl my-5"
                >
                  <img
                    src={item?.magazineId?.imageUrl}
                    alt={item?.magazineId?.title}
                    className="w-40 h-auto"
                  />
                  <div className="m-4 relative w-full">
                    <p className="">{item?.magazineId?.title}</p>
                    <p className="">{item?.magazineId?.userId?.fullName}</p>
                    <p className="absolute bottom-0 right-0">
                      {` Ngày ${Commons.formatTimeDay(
                        item?.magazineId?.createdAt
                      )} tháng ${Commons.formatTimeMonth(
                        item?.magazineId?.createdAt
                      )} năm ${Commons.formatTimeYear(
                        item?.magazineId?.createdAt
                      )}`}
                    </p>
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
