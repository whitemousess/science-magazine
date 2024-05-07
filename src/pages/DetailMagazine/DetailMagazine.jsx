import { useEffect, useState } from "react";
import { CiDatabase } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import { Commons } from "~/Common/Commons";
import Paginate from "~/components/Paginate";
import { getArticleMagazine } from "~/services/articlesService";

function DetailMagazine() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getArticleMagazine({ id, page: currentPage, title: search }).then(
      (article) => {
        console.log(article);
        setData(article.data);
        setTotalPage(article.totalPage);
      }
    );
  }, [id]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <div className="p-4">
      <div className="bg-gray-100 p-4 rounded-xl shadow-black/15 shadow-inner">
        {data.length > 0 ? (
          data.map((item) => (
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
          ))
        ) : (
          <div className="flex mb-[415px] flex-col justify-center items-center h-full">
            <CiDatabase size={100} />
            <p className="">Chưa có tạp chí nào?</p>
          </div>
        )}
      </div>
      <Paginate
        totalPage={totalPage}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
}

export default DetailMagazine;
