import { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import ImageResize from "quill-image-resize-module-react";

import TextInput from "~/components/TextInput";
import { newArticles } from "~/services/articlesService";
import { AuthContext } from "~/shared/AuthProvider";
import {
  getMagazineById,
  getMagazineUnpublished,
} from "~/services/magazineService";
import EmptyClient from "~/components/EmptyClient";
import { useNavigate } from "react-router-dom";

Quill.register("modules/imageResize", ImageResize);

function NewArticle() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    imageUrl: "",
    magazineId: "",
    fileUrl: "",
  });
  const [description, setDescription] = useState("");
  const [showImage, setShowImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectMagazine, setSelectMagazine] = useState([]);
  const [magazineImage, setMagazineImage] = useState({});

  const addArticle = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", description);
    formData.append("imageUrl", data.imageUrl);
    formData.append("magazineId", data.magazineId);
    formData.append("fileUrl", data.fileUrl);

    await newArticles({ data: formData })
      .then((a) => {
        alert("Thêm mới thành công");
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

  const onChangeMagazine = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
    getMagazineById({ id: e.target.value })
      .then((magazine) => {
        setMagazineImage(magazine.data.imageUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const img = URL.createObjectURL(file);
      setImage(img);
      const newData = { ...data };
      newData.imageUrl = file;
      setData(newData);
    } else if (file && file.type.startsWith("application/")) {
      const newData = { ...data };
      newData.fileUrl = file;
      setData(newData);
    }
  };

  useEffect(() => {
    getMagazineUnpublished({})
      .then((magazine) => {
        setSelectMagazine(magazine.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!token) {
    return;
  }

  return (
    <div className="px-10 w-full">
      {selectMagazine.length > 0 ? (
        <>
          <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <p className="mt-4 text-center">Số xuất bản tiếp theo</p>
              <img src={magazineImage} alt="" className="w-56 my-4" />
            </div>
            {showImage && (
              <img
                src={showImage}
                alt=""
                className="rounded-lg  w-auto h-56 m-4"
              />
            )}
          </div>
          <select
            name="magazineId"
            className="p-2 mb-4 w-full border rounded-lg"
            required
            value={data.magazineId}
            onChange={onChangeMagazine}
          >
            <option value="">Chọn trang tạp chí</option>
            {selectMagazine.map((item) => (
              <option value={item._id} key={item._id}>
                {item.title}
              </option>
            ))}
          </select>

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
              Tải ảnh
            </label>

            <div className="flex flex-col mb-4">
              <label
                className="mb-2 text-sm font-medium text-gray-900 border rounded-lg p-4"
                htmlFor="file_pdf"
              >
                Chọn file thông tin ( pdf )
              </label>
              <input
                required
                type="file"
                className="opacity-0 h-0"
                onChange={onChangeFile}
                accept=".pdf"
                id="file_pdf"
                name="fileUrl"
              />
            </div>

            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={modules}
            />

            <div>
              <button
                className="bg-primary mt-4 text-white hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                onClick={() => (isLoading ? null : addArticle())}
              >
                {isLoading ? "Đang đăng ..." : "Đăng bài"}
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
        </>
      ) : (
        <div>
          <EmptyClient title={"Không còn tạp chí nào để đăng bài"} />
        </div>
      )}
    </div>
  );
}

export default NewArticle;
