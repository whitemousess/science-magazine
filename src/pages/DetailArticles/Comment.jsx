import Pusher from "pusher-js";
import { useCallback, useContext, useEffect, useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

import { IoSendSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import Avatar from "~/components/Avatar";
import Paginate from "~/components/Paginate";
import {
  addComment,
  editComment,
  getCommentArticle,
  removeComment,
} from "~/services/commentService";
import { AuthContext } from "~/shared/AuthProvider";

function Comment() {
  const { id } = useParams();
  const { currentUser,token } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [comment, setComment] = useState({ comment: "" });
  const [inputEdit, setInputEdit] = useState("");
  const [textEdit, setTextEdit] = useState({ comment: "", commentId: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const fetchData = useCallback(() => {
    getCommentArticle({ articleId: id, page: currentPage, perPage: 10 })
      .then((comment) => {
        setData(comment.data);
        setTotalPage(comment.totalPage);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, currentPage]);

  const submitComment = (e) => {
    e.preventDefault();
    addComment({ articleId: id, data: comment })
      .then(() => {
        fetchData();
        setComment({ comment: "" });
      })
      .catch((err) => console.error(err));
  };

  const submitEdit = (e) => {
    e.preventDefault();
    editComment({ commentId: textEdit.commentId, data: textEdit })
      .then((data) => {
        console.log(data);
        fetchData();
        setInputEdit("");
        setTextEdit("");
        setComment({ comment: "", commentId: "" });
      })
      .catch((err) => console.error(err));
  };

  const deleteComment = (id) => {
    removeComment({ id })
      .then(fetchData())
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_KEY_PUSHER, {
      cluster: import.meta.env.VITE_CLUSTER_PUSHER,
    });
    const channel = pusher.subscribe(id);

    channel.bind("comment", () => {
      fetchData();
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [fetchData, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="mx-10 my-4 ">
      {token && (
        <form
          onSubmit={submitComment}
          className="flex  justify-between border rounded-lg"
        >
          <input
            type="text"
            placeholder="Nhập bình luận ..."
            className="w-full px-6 py-2 outline-none"
            name="comment"
            value={comment.comment}
            onChange={(e) => setComment({ comment: e.target.value })}
            required
            aria-label="123"
          />
          <button type="submit">
            <IoSendSharp
              className={`p-4 ${
                !comment.comment
                  ? "text-gray-300"
                  : "text-blue-600 cursor-pointer"
              }`}
              size={50}
            />
          </button>
        </form>
      )}
      <form
        onSubmit={submitEdit}
        className="border mt-2 rounded-xl select-none"
      >
        {data.map((item) => (
          <div key={item._id} className="flex my-2 mx-2 group">
            <Avatar
              src={item.userId.imageUrl}
              alt="avatar"
              className="w-[40px] h-[40px] mr-2 rounded-full object-cover"
            />

            <div className="py-1 px-4 rounded-xl border bg-slate-100">
              <p className="font-medium">{item.userId.fullName} </p>
              {inputEdit !== item._id ? (
                <p>{item.comment}</p>
              ) : (
                <input
                  type="text"
                  value={textEdit.comment}
                  onChange={(e) =>
                    setTextEdit({ ...textEdit, comment: e.target.value })
                  }
                  autoFocus
                  className="outline-none border px-2 rounded-lg border-slate-200"
                />
              )}
            </div>
            {currentUser?._id === item?.userId?._id && (
              <div className="hidden group-hover:flex items-center cursor-pointer ml-2">
                {inputEdit !== item._id ? (
                  <>
                    <CiTrash
                      className="p-3 hover:bg-red-300 rounded-full"
                      size={40}
                      onClick={() => deleteComment(item._id)}
                    />
                    <CiEdit
                      className="p-3 hover:bg-green-100 rounded-full"
                      size={40}
                      onClick={() => {
                        setInputEdit(item._id);
                        setTextEdit({
                          commentId: item._id,
                          comment: item.comment,
                        });
                      }}
                    />
                  </>
                ) : (
                  <>
                    <button type="submit">
                      <IoMdCheckmark
                        className="p-3 hover:bg-green-200 rounded-full"
                        size={40}
                      />
                    </button>
                    <IoMdClose
                      className="p-3 hover:bg-red-100 rounded-full"
                      size={40}
                      onClick={() => {
                        setInputEdit("");
                        setTextEdit({ comment: "", commentId: "" });
                      }}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </form>

      <Paginate
        totalPage={totalPage}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Comment;
