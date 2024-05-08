import { useContext, useEffect, useState } from "react";
import { CiDatabase } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import { Commons } from "~/Common/Commons";
import Avatar from "~/components/Avatar";
import Paginate from "~/components/Paginate";
import { getArticlesActor } from "~/services/articlesService";
import { getUserById } from "~/services/userService";
import { AuthContext } from "~/shared/AuthProvider";

function DetailActor() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [dataArticles, setDataArticles] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };
  useEffect(() => {
    getUserById({ id })
      .then((user) => {
        setData(user.data);
        document.title = user.data.fullName;
      })
      .catch((error) => {
        console.log(error);
      });

    getArticlesActor({ id, page: currentPage, perPage: 10 })
      .then((articles) => {
        setDataArticles(articles.data);
        setTotalPage(articles.totalPage);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, currentPage]);

  return (
    <div className="flex flex-col items-center justify-center w-full py-10">
      {data && (
        <>
          <div className="py-10 flex flex-col items-center justify-center border-b ">
            <Avatar
              src={data.imageUrl}
              alt="avatar"
              className="w-[200px] h-[200px] rounded-full"
            />
          </div>
          <div className="w-2/3">
            <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
              <div className="bg-blue-200 px-4 py-2">Họ và tên</div>
              <div className="px-4 py-2">
                {data.academic_degree}.{data.fullName}
              </div>
            </div>

            <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
              <div className="bg-blue-200 px-4 py-2">Ngày sinh</div>
              <div className="px-4 py-2">{Commons.formatTime(data.dob)}</div>
            </div>

            <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
              <div className="bg-blue-200 px-4 py-2">Email</div>
              <div className="px-4 py-2">{data.email}</div>
            </div>

            <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
              <div className="bg-blue-200 px-4 py-2">Số điện thoại</div>
              <div className="px-4 py-2">{data.phone || 0}</div>
            </div>

            <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
              <div className="bg-blue-200 px-4 py-2">Giới tính</div>
              <div className="px-4 py-2">
                {data.gender === 0 ? "Nam" : "Nữ"}
              </div>
            </div>

            <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
              <div className="bg-blue-200 px-4 py-2">Tốt nghiệp tại trường</div>
              <div className="px-4 py-2">{data.education}</div>
            </div>

            <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
              <div className="bg-blue-200 px-4 py-2">Địa chỉ</div>
              <div className="px-4 py-2">
                {data.districts} - {data.province}
              </div>
            </div>

            <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
              <div className="bg-blue-200 px-4 py-2">Số điện thoại</div>
              <div className="px-4 py-2">{data.phone || 0}</div>
            </div>

            <div className="border border-blue-200 rounded-[5px] mb-2">
              <div className="bg-blue-200 px-4 py-2">Mô tả</div>
              <div className="px-4 py-2 break-words">{data.biography}</div>
            </div>
          </div>

          {dataArticles && dataArticles.length > 0 ? (
            <div className=" w-[1022px]">
              <p className="py-10 text-2xl text-center font-bold">
                Bài viết đã đăng
              </p>
              {dataArticles.map((item) => (
                <Link
                  to={`/articles/${item._id}`}
                  key={item._id}
                  className="flex bg-white rounded-xl"
                >
                  <img src={item.imageUrl} alt={item.title} className="h-40" />
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
              <p className="">Chưa có tạp chí nào?</p>
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
  );
}

export default DetailActor;
