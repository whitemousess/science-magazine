import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getDetailArticles } from "~/services/articlesService";
import Item from "./Item";
import { addFavorite, removeFavorite } from "~/services/favoriteService";

function DetailArticles() {
  const { id } = useParams();
  const [data, setData] = useState({});

  const liked = (id) => {
    addFavorite({ articleId: id })
      .then()
      .catch((error) => console.error(error));
  };

  const removeLiked = (id) => {
    removeFavorite({ id: id })
      .then()
      .catch((error) => console.log(error));
  };

  const fetchData = useCallback(
    () =>
      getDetailArticles({ id })
        .then((articles) => setData(articles))
        .catch((err) => console.log(err)),
    [id]
  );
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <Item data={data} liked={liked} removeLiked={removeLiked} />;
}

export default DetailArticles;
