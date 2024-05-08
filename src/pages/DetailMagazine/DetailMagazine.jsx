import { useEffect, useState } from "react";
import { CiDatabase } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import { Commons } from "~/Common/Commons";
import Paginate from "~/components/Paginate";
import { getArticleMagazine, getTopArticle } from "~/services/articlesService";
import { getMagazinePublish } from "~/services/magazineService";

function DetailMagazine() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsMagazine, setNewMagazine] = useState({});
  const [topArticle, setTopArticle] = useState([]);

  useEffect(() => {
    getMagazinePublish({
      page: 1,
      perPage: 1,
    })
      .then((magazine) => {
        setNewMagazine(magazine.data[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getTopArticle()
      .then((article) => {
        setTopArticle(article);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getArticleMagazine({ id, page: currentPage, title: search }).then(
      (article) => {
        setData(article.data);
        setTotalPage(article.totalPage);
      }
    );
  }, [id, search, currentPage]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <div className="p-4 flex">
      <div className="w-4/12 px-6 ">
        <div className="bg-gray-100 p-4 h-full rounded-xl shadow-black/15 shadow-inner">
          <div className="w-full border bg-white rounded-xl overflow-hidden pt-2">
            <p className="text-center mb-2">Số tạp chí mới nhất</p>
            {newsMagazine ? (
              <Link to={`/magazine/${newsMagazine._id}`}>
                <img src={newsMagazine.imageUrl} alt="" className="" />
              </Link>
            ) : (
              <p className="text-red-500 text-center">Chưa có tạp chí nào</p>
            )}
          </div>

          <div className="w-full border bg-white rounded-xl mt-4 overflow-hidden  pt-2">
            <p className="text-center mb-2">Bài viết nổi bật</p>

            {topArticle.length > 0 ? (
              topArticle.map((item) => (
                <div className="m-4" key={item._id}>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Link
                    to={`/articles/${item._id}`}
                    className="underline text-blue-900"
                  >
                    {item.title}
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-red-500 text-center">Chưa có tạp chí nào</p>
            )}
          </div>
        </div>
      </div>
      <div className="w-5/12 bg-gray-100 p-4 rounded-xl shadow-black/15 shadow-inner">
        {data.length > 0 ? (
          data.map((item) => (
            <Link
              to={`/articles/${item._id}`}
              key={item._id}
              className="flex bg-white rounded-xl overflow-hidden  mb-4"
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
          ))
        ) : (
          <div className="flex mb-[415px] flex-col justify-center items-center h-full">
            <CiDatabase size={100} />
            <p className="">Chưa có bài báo nào?</p>
          </div>
        )}
        <Paginate
          totalPage={totalPage}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>

      <div className="w-3/12 px-10 sticky top-[90px] h-full">
        <div className="bg-gray-50 p-4 h-full rounded-xl shadow-black/15 shadow-inner">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border w-full p-2 rounded outline-none"
            placeholder="Tìm kiếm tạp chí "
          />
        </div>
      </div>
    </div>
  );
}

export default DetailMagazine;
