import PropTypes from "prop-types";

import ArticleItem from "./ArticleItem";
import EmptyClient from "../EmptyClient";

function ListArticles({ data }) {
  if (data.length === 0) {
    return <EmptyClient />;
  }

  return (
    <>
      <div className="md:px-24 px-4 ">
        <div className="font-bold pt-4">Bài viết</div>
        <div className="md:px-32 py-10 xl:flex flex-col items-center">
          {data.map((item) => (
            <ArticleItem key={item._id} data={item} />
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
