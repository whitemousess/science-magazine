import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css";
import { CiChat1 } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";
import { IoMdMore } from "react-icons/io";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "~/shared/AuthProvider";
import { searchFavorite } from "~/services/favoriteService";
import Comment from "./Comment";
import { Link, useNavigate, useParams } from "react-router-dom";
import Avatar from "~/components/Avatar";
import Modal from "~/components/Modal";
import routes from "~/config/routes";

function Item({ data, liked, removeLiked, deleteArticle }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, currentUser } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    <>
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
          <p className="ml-2 font-medium">{data?.userId?.fullName}</p>
        </div>
        {data?.userId?._id === currentUser?._id && (
          <div className="group relative">
            <IoMdMore className="p-2 cursor-pointer" size={40} />
            <div className="w-[150px] text-center hidden group-hover:block absolute rounded-lg overflow-hidden right-0 bg-slate-100 ">
              <div
                className="px-4 py-1 hover:bg-slate-200 cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                Xóa bài viết
              </div>
              <Link to={`/articles/edit/${data._id}`}>
                <div className="px-4 py-1 hover:bg-slate-200 cursor-pointer">
                  Sửa bài viết
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="ql-editor xl:px-[340px] sm:px-[100px] px-10">
        <div dangerouslySetInnerHTML={{ __html: data.description }} />
      </div>

      <div className="flex select-none mt-4 border-t border-b">
        <div
          className={`w-1/2 flex justify-center items-center py-1  ${
            isFavorite && `text-primary font-medium`
          } hover:bg-slate-300 cursor-pointer rounded`}
          onClick={handleLike}
        >
          <AiFillLike size={20} className={`m-2`} />
          <p className="text-lg">Thích</p>
        </div>

        <div className="w-1/2 flex justify-center items-center py-1 hover:bg-slate-300 cursor-pointer rounded">
          <CiChat1 size={20} className="m-2 text-" />
          <p className="text-lg">Bình luận</p>
        </div>
      </div>

      <Comment />

      <Modal
        showModal={showModal}
        title="Bạn có chắc muốn xóa"
        onClose={() => setShowModal(false)}
        onSubmit={() => deleteArticle(data._id)}
        description="Bạn có chắc muốn xóa"
      />
    </>
  );
}

Item.propTypes = {
  data: PropTypes.object.isRequired,
  liked: PropTypes.func,
  removeLiked: PropTypes.func,
  deleteArticle: PropTypes.func,
};

export default Item;
