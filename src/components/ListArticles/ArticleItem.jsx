import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { CiChat1 } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

import { searchFavorite } from "~/services/favoriteService";
import { AuthContext } from "~/shared/AuthProvider";
import Avatar from "../Avatar";
import routes from "~/config/routes";

function ArticleItem({ data, liked, removeLiked }) {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleLike = () => {
    if (token) {
      isFavorite ? removeLiked(data._id) : liked(data._id);
      setIsFavorite(!isFavorite);
    } else {
      navigate(routes.login);
    }
  };

  useEffect(() => {
    if (token) {
      searchFavorite({ articleId: data._id })
        .then((data) => setIsFavorite(data.data.length > 0))
        .catch((error) => console.log(error));
    }
  }, [data, token]);

  return (
    <div className="flex flex-col justify-center w-full xl:w-1/2 bg-gray-100 rounded-xl overflow-hidden mb-6">
      <div className="px-4 py-3 flex items-center">
        <Avatar
          src={data.userId.imageUrl}
          alt={data.userId.fullName}
          className="w-[50px] h-[50px] rounded-full mr-2"
        />
        <p className="font-medium">{data.userId.fullName}</p>
      </div>
      <Link
        to={`/articles/${data._id}`}
        className="h-[500px] w-auto border-t border-b "
      >
        <img
          src={data.imageUrl}
          alt={data.title}
          className="h-[500px] w-full object-cover"
        />
      </Link>
      <div>
        <p className="px-4 py-3 ">{data.title}</p>
        <div className="flex select-none">
          <div
            className={`w-1/2 flex justify-center items-center py-1  ${
              isFavorite && `text-primary font-medium`
            } hover:bg-slate-300 cursor-pointer rounded`}
            onClick={handleLike}
          >
            <AiFillLike size={20} className={`m-2`} />
            <p className="text-lg">Thích</p>
          </div>

          <Link
            to={token ? `/articles/${data._id}` : routes.login}
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
