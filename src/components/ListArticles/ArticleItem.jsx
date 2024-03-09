import { AiFillLike } from "react-icons/ai";
import { CiChat1 } from "react-icons/ci";
import { Link } from "react-router-dom";

function ArticleItem() {
  return (
    <div className="flex flex-col justify-center w-full xl:w-1/2 bg-gray-100 rounded-xl overflow-hidden mb-6">
      <div className="px-4 py-3 flex items-center">
        <div className="w-[50px] h-[50px] bg-neutral-400 rounded-full mr-2"></div>
        <p className="font-medium">FullName</p>
      </div>
      <Link
        to={"/articles/1231"}
        className="h-[500px] w-auto border-t border-b"
      ></Link>
      <div>
        <p className="px-4 py-3 ">Status Description</p>
        <div className="flex">
          <div className="w-1/2 flex justify-center items-center py-1 hover:bg-slate-300 cursor-pointer rounded">
            <AiFillLike size={20} className="m-2 text-primary" />
            {/* <AiOutlineLike /> */}
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

export default ArticleItem;
