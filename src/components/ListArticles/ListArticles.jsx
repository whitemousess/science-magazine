import PropTypes from "prop-types";

import ArticleItem from "./ArticleItem";
import EmptyClient from "../EmptyClient";
import { addFavorite, removeFavorite } from "~/services/favoriteService";

function ListArticles({ data }) {

  if (data.length === 0) {
    return <EmptyClient />;
  }

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

ListArticles.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ListArticles;
