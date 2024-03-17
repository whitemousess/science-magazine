import { useEffect, useState } from "react";

import ArticleItem from "./ArticleItem";
import EmptyClient from "~/components/EmptyClient";
import {
  addFavorite,
  getMyFavorite,
  removeFavorite,
} from "~/services/favoriteService";

function ListArticles() {
  const [data, setData] = useState([]);

  const liked = (id) => {
    addFavorite({ articleId: id })
      .then(fetchData())
      .catch((error) => console.error(error));
  };

  const removeLiked = (id) => {
    removeFavorite({ id: id })
      .then(fetchData())
      .catch((error) => console.log(error));
  };

  const fetchData = () => {};
  getMyFavorite({ page: 1, perPage: 10 })
    .then((favorite) => {
      setData(favorite.data);
    })
    .catch((error) => console.log(error));

  useEffect(() => {
    fetchData();
  }, []);

  if (!data || data.length === 0) {
    return <EmptyClient />;
  }

  return (
    <>
      <div className="md:px-24 px-4 ">
        <div className="font-bold pt-4">Bài viết</div>
        <div className="md:px-32 py-10 xl:flex flex-col items-center">
          {data.map((item) => (
            <ArticleItem
              key={item._id}
              data={item}
              liked={liked}
              removeLiked={removeLiked}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ListArticles;
