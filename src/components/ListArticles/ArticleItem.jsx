import PropTypes from "prop-types";
import { AiFillLike } from "react-icons/ai";
import { CiChat1 } from "react-icons/ci";
import { Link } from "react-router-dom";

function ArticleItem({ data }) {
  return (
    <div className="flex flex-col justify-center w-full xl:w-1/2 bg-gray-100 rounded-xl overflow-hidden mb-6">
      <div className="px-4 py-3 flex items-center">
        <img
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
        <div className="flex">
          <div className="w-1/2 flex justify-center items-center py-1 hover:bg-slate-300 cursor-pointer rounded">
            <AiFillLike size={20} className="m-2 text-primary" />
            <p className="text-lg">Thích</p>
          </div>
          <div className="w-1/2 flex justify-center items-center py-1 hover:bg-slate-300 cursor-pointer rounded">
            <CiChat1 size={20} className="m-2 text-" />
            <p className="text-lg">Bình luận</p>
          </div>
        </div>
      </div>
    </div>
  );
}

ArticleItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ArticleItem;
