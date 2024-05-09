import { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import Quill from "quill";
import ImageResize from "quill-image-resize-module-react";

import TextInput from "~/components/TextInput";
import { editArticles, getDetailArticles } from "~/services/articlesService";
import { AuthContext } from "~/shared/AuthProvider";

Quill.register("modules/imageResize", ImageResize);

function EditArticle() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [data, setData] = useState({ title: "", imageUrl: "" });
  const [description, setDescription] = useState("");
  const [showImage, setShowImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addArticle = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", description);
    formData.append("imageUrl", data.imageUrl);

    await editArticles({ id, data: formData })
      .then(() => {
        alert("Sửa thành công");
        setIsLoading(false);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      ["size", "link", "image"],
    ],
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  const onChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const onChangImages = (e) => {
    const file = e?.target?.files[0];
    if (file && file.type.startsWith("image/")) {
      const img = URL.createObjectURL(e.target.files[0]);
      setShowImage(img);
      setData({ ...data, imageUrl: file });
    }
  };

  useEffect(() => {
    getDetailArticles({ id })
      .then((article) => {
        setData(article);
        setDescription(article.descriptionId.description);
        setShowImage(article.imageUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!token) {
    return;
  }

  return (
    <div className="px-10">
      {showImage && (
        <img
          src={showImage}
          alt=""
          className="rounded-lg w-[300px] h-auto mb-2"
        />
      )}

      <a href={data.fileUrl} target="_blank">
        <button className="py-2 px-10 rounded-lg bg-green-500 text-white border hover:border-green-700 my-4">Pdf</button>
      </a>

      <TextInput
        type="text"
        title={"Tiêu đề"}
        value={data.title}
        name={"title"}
        onChange={onChange}
      />

      <div className="flex flex-col mb-4">
        <label
          className="my-2 text-sm font-medium text-gray-900 border rounded-lg p-4"
          htmlFor="file_image"
        >
          Upload image
        </label>

        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          modules={modules}
        />

        <div>
          <button
            className={`${
              isLoading && "cursor-wait"
            } bg-primary mt-4 text-white hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
            onClick={() => (isLoading ? null : addArticle())}
          >
            {isLoading ? "Đang sửa ..." : "Sửa thông tin"}
          </button>
        </div>

        <input
          className="opacity-0 h-0"
          id="file_image"
          name="imageUrl"
          required
          type="file"
          accept="image/*"
          onChange={onChangImages}
        />
      </div>
    </div>
  );
}

export default EditArticle;
