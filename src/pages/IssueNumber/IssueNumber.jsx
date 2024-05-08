import { useContext, useEffect, useState } from "react";
import { CiDatabase } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Commons } from "~/Common/Commons";
import BarChartHome from "~/components/BarChartHome";
import Paginate from "~/components/Paginate";
import routes from "~/config/routes";
import { getTopArticle } from "~/services/articlesService";
import { getMagazinePublish } from "~/services/magazineService";
import { getActor } from "~/services/userService";
import { addViewMagazine } from "~/services/viewMagazineService";
import { AuthContext } from "~/shared/AuthProvider";

function IssueNumber() {
  const { token, role } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [newsMagazine, setNewMagazine] = useState({});
  const [topArticle, setTopArticle] = useState([]);
  const [actor, setActor] = useState([]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const addHistory = (item) => {
    if (token && role !== 0) {
      addViewMagazine({ data: item._id })
        .then((history) => console.log(history))
        .catch((error) => console.log(error));
    }
    navigate(`/magazine/${item._id}`);
  };

  useEffect(() => {
    getMagazinePublish({
      page: currentPage,
      perPage: 10,
      title: search,
      type,
      publishingYear,
    })
      .then((magazine) => {
        setData(magazine.data);
        setTotalPage(magazine.totalPages);
      })
      .catch((err) => console.error(err));
  }, [search, type, publishingYear]);

  useEffect(() => {
    getMagazinePublish({
      page: 1,
      perPage: 1,
    })
      .then((magazine) => {
        setNewMagazine(magazine.data[0]);
      })
      .catch((err) => console.error(err));

    getTopArticle()
      .then((article) => {
        setTopArticle(article);
      })
      .catch((err) => console.log(err));

    getActor({})
      .then((actor) => {
        setActor(actor.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex py-4">
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
              <p className="text-red-500 text-center">Chưa có bài báo nào</p>
            )}
          </div>

          <div className="w-full border bg-white rounded-xl mt-4 overflow-hidden  pt-2">
            <p className="text-center mb-2">Tất cả tác giả</p>

            {actor.length > 0 ? (
              actor.map((item) => (
                <div className="m-4" key={item._id}>
                  <Link
                    to={`/actor/${item._id}`}
                    className="flex h-[100px] border rounded overflow-hidden group pr-1 hover:shadow-black/20 shadow-inner"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.fullName}
                      className="w-[100px] h-[100px] object-cover mr-2"
                    />
                    <div className="py-1">
                      <p className="group-hover:underline group-hover:text-blue-900 ">
                        {item.academic_degree}.{item.fullName}
                      </p>
                      <p className="">{item.education}</p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-red-500 text-center">Chưa có Tác giả</p>
            )}
          </div>
          
          <BarChartHome />
        </div>
      </div>

      <div className="w-5/12 px-4 border-l border-r rounded-xl bg-gray-100 py-4 shadow-black/15 shadow-inner">
        {data.length > 0 ? (
          <div>
            {data.map((item) => (
              <div
                onClick={() => addHistory(item)}
                className="flex bg-white rounded-xl mb-4 cursor-pointer"
                key={item._id}
              >
                <img src={item.imageUrl} alt="" className="w-48 h-auto" />
                <div className="m-4 relative w-full">
                  <h3>{item.title}</h3>
                  <p>{`Ngày ${Commons.formatTimeDay(
                    item.publishingYear
                  )} tháng ${Commons.formatTimeMonth(
                    item.publishingYear
                  )} năm ${Commons.formatTimeYear(item.publishingYear)}`}</p>
                  <p>Bản phát hành số : {item.versionPublish}</p>
                  <p className="absolute bottom-0">
                    Được xuất bản bởi trường đại học ...
                  </p>
                </div>
              </div>
            ))}

            {location.pathname !== routes.home && (
              <Paginate
                totalPage={totalPage}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
              />
            )}
          </div>
        ) : (
          <div className="flex mb-[415px] flex-col justify-center items-center h-full">
            <CiDatabase size={100} />
            <p className="">Chưa có tạp chí nào?</p>
          </div>
        )}
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

          <select
            name="type"
            className="border w-full p-2 mt-2 rounded outline-none"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Tìm theo khoa</option>
            {Commons.selection().typeMagazine.map((item) => (
              <option value={item.type} key={item.type}>
                {item.title}
              </option>
            ))}
          </select>

          {role === 2 && (
            <Link
              className="bg-green-500 hover:shadow-green-800 shadow flex w-full justify-center py-2 mt-4 text-white rounded"
              to={token ? routes.newArticle : routes.login}
            >
              Yêu cầu đăng bài
            </Link>
          )}

          {Commons.selection().publishingYear.map((item) => (
            <button
              key={item.title}
              onClick={() => setPublishingYear(item.type)}
              className={`w-full border py-2 my-2 rounded hover:bg-primary/10 ${
                publishingYear === item.type &&
                "bg-primary/10 shadow-inner shadow-primary/20"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IssueNumber;
