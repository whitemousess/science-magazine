import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { deleteArticles, getDetailArticles } from "~/services/articlesService";
import Item from "./Item";
import { addFavorite, removeFavorite } from "~/services/favoriteService";

function DetailArticles() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const deleteArticle = (id) => {
    deleteArticles({ id }).then(() => {
      alert("Delete article");
      navigate(-1);
    });
  };

  const fetchData = useCallback(
    () =>
      getDetailArticles({ id })
        .then((articles) => setData(articles.data))
        .catch((err) => console.log(err)),
    [id]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
      <Item
        data={data}
        liked={liked}
        removeLiked={removeLiked}
        deleteArticle={deleteArticle}
      />
  );
}

export default DetailArticles;
