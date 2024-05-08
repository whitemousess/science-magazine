import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css";
import { CiChat1 } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";

import { AuthContext } from "~/shared/AuthProvider";
import { searchFavorite } from "~/services/favoriteService";
import Comment from "./Comment";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "~/components/Avatar";
import routes from "~/config/routes";

function Item({ data, liked, removeLiked }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
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
      searchFavorite({ articleId: id })
        .then((favorite) => setIsFavorite(favorite.data.length > 0))
        .catch((error) => console.log(error));
    }
  }, [id, token]);

  return (
    <div>
      <div className="text-center font-bold text-2xl py-10 border-b">
        <p className="text-2xl font-bold">{data.title}</p>
        <div className="flex justify-center mt-4">
          <img
            src={data.imageUrl}
            alt={data.title}
            className="h-[100vh] w-auto"
          />
        </div>
      </div>

      <div className="flex items-center justify-between px-10">
        <div className="flex items-center py-5">
          <Avatar
            src={data?.userId?.imageUrl}
            alt="avatar"
            className="w-[42px] h-[42px] rounded-full"
          />
          <p className="ml-2 font-medium">{data?.userId?.fullName || "Trường Đại học Tài nguyên và Môi trường Hà Nội "}</p>
        </div>
      </div>
      <div className="ql-editor xl:px-[340px] sm:px-[100px] px-10">
        <div
          dangerouslySetInnerHTML={{ __html: data.descriptionId?.description }}
        />
      </div>

      <div className="flex select-none mt-4 border-t border-b">
        <div
          className={`w-1/2 flex justify-center items-center py-1  ${
            isFavorite && `text-primary font-medium`
          } hover:bg-slate-300 cursor-pointer rounded`}
          onClick={handleLike}
        >
          {!isFavorite ? (
            <BiLike size={20} className={`m-2`} />
          ) : (
            <AiFillLike size={20} className={`m-2`} />
          )}
          <p className="text-lg">Thích</p>
        </div>

        <div className="w-1/2 flex justify-center items-center py-1 hover:bg-slate-300 cursor-pointer rounded">
          <CiChat1 size={20} className="m-2 text-" />
          <p className="text-lg">Bình luận</p>
        </div>
      </div>

      <Comment />
    </div>
  );
}

Item.propTypes = {
  data: PropTypes.object.isRequired,
  liked: PropTypes.func,
  removeLiked: PropTypes.func,
};

export default Item;
