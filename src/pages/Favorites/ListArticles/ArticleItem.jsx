import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { CiChat1 } from "react-icons/ci";
import { Link } from "react-router-dom";

import { searchFavorite } from "~/services/favoriteService";
import { getUserById } from "~/services/userService";
import { AuthContext } from "~/shared/AuthProvider";

function ArticleItem({ data, liked, removeLiked }) {
  const { token } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userPost, setUserPost] = useState({});

  useEffect(() => {
    if (token) {
      searchFavorite({ articleId: data.articleId._id })
        .then((data) => setIsFavorite(data.data.length > 0))
        .catch((error) => console.log(error));
    }
    getUserById({ id: data.articleId.userId }).then((data) =>
    setUserPost(data.data)
    );
  }, [data, token]);

  return (
    <div className="flex flex-col justify-center w-full xl:w-1/2 bg-gray-100 rounded-xl overflow-hidden mb-6">
      <div className="px-4 py-3 flex items-center">
        <img
          src={userPost.imageUrl}
          alt={userPost.fullName}
          className="w-[50px] h-[50px] rounded-full mr-2"
        />
        <p className="font-medium">{userPost.fullName}</p>
      </div>
      <Link
        to={`/articles/${data.articleId._id}`}
        className="h-[500px] w-auto border-t border-b "
      >
        <img
          src={data.articleId.imageUrl}
          alt={data.articleId.title}
          className="h-[500px] w-full object-cover"
        />
      </Link>
      <div>
        <p className="px-4 py-3 ">{data.articleId.title}</p>
        <div className="flex select-none">
          <div
            className={`w-1/2 flex justify-center items-center py-1  ${
              isFavorite && `text-primary font-medium`
            } hover:bg-slate-300 cursor-pointer rounded`}
            onClick={() => {
              isFavorite ? removeLiked(data.articleId._id) : liked(data.articleId._id);
              setIsFavorite(!isFavorite);
            }}
          >
            <AiFillLike size={20} className={`m-2`} />
            <p className="text-lg">Thích</p>
          </div>

          <Link
            to={`/articles/${data._id}`}
            className="w-1/2 flex justify-center items-center py-1 hover:bg-slate-300 cursor-pointer rounded"
          >
            <CiChat1 size={20} className="m-2 text-" />
            <p className="text-lg">Bình luận</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

ArticleItem.propTypes = {
  data: PropTypes.object.isRequired,
  liked: PropTypes.func,
  removeLiked: PropTypes.func,
};

export default ArticleItem;
