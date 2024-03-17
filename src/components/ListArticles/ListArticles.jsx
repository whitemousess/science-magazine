import PropTypes from "prop-types";

import ArticleItem from "./ArticleItem";
import EmptyClient from "../EmptyClient";
import { addFavorite, removeFavorite } from "~/services/favoriteService";

function ListArticles({ data }) {
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

  if (!data || data.length === 0) {
    return <EmptyClient />;
  }
  return (
    <>
      <div className="md:px-24 px-4 ">
        <div className="font-bold pt-4">Bài viết</div>
        <div className="md:px-32 py-10 xl:flex flex-col items-center">
          {data.length > 0 &&
            data.map((item) => (
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

ListArticles.propTypes = {
  data: PropTypes.array,
};

export default ListArticles;
