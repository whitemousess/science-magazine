import { useContext, useEffect, useState } from "react";
import { AuthContext } from "~/shared/AuthProvider";
import Paginate from "~/components/Paginate";
import { getMyFavorite } from "~/services/favoriteService";
import { Link } from "react-router-dom";
import EmptyClient from "~/components/EmptyClient";

function Favorites() {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  useEffect(() => {
    if (token) {
      getMyFavorite({ page: 1, perPage: 10 })
        .then((favorite) => {
          setData(favorite.data);
          console.log(favorite);
        })
        .catch((error) => console.log(error));
    }
  }, [token]);

  if (!token) {
    return;
  }

  if (data.length === 0) {
    return <EmptyClient title={"Không còn Bài yêu thích nào"} />;
  }

  return (
    <div className="p-4">
      <div className="bg-gray-100 p-4 rounded-xl shadow-black/15 shadow-inner">
        {data.map((item) => (
          <Link
            to={`/articles/${item.articleId._id}`}
            key={item.articleId._id}
            className="flex bg-white"
          >
            <img
              src={item.articleId.imageUrl}
              alt={item.articleId.title}
              className="h-40"
            />
            <p>{item.articleId.title}</p>
          </Link>
        ))}
      </div>
      <Paginate
        totalPage={totalPage}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Favorites;
