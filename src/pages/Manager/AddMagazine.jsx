import { useEffect, useState } from "react";

import TextInput from "~/components/TextInput";
import { Commons } from "~/Common/Commons";
import * as magazineService from "~/services/magazineService";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "~/config/routes";

function AddMagazine() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({
    title: "",
    imageUrl: "",
    type: "",
  });
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const img = URL.createObjectURL(file);
      setImage(img);

      const newData = { ...data };
      newData.imageUrl = file;
      setData(newData);
    }
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("imageUrl", data.imageUrl);
    formData.append("type", data.type);

    if (location?.state?.status === "Edit") {
      await magazineService
        .editMagazine({ data: formData, id: location?.state?.dataMagazine._id })
        .then((result) => {
          navigate(routes.magazineAdmin);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      await magazineService
        .addMagazine({ data: formData })
        .then((result) => {
          navigate(routes.magazineAdmin);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (location?.state?.status === "Edit") {
      setData(location?.state?.dataMagazine);
      setImage(location?.state?.dataMagazine.imageUrl);
    }
  }, [status, location?.state?.dataMagazine]);

  return (
    <div className="w-full mt-4 flex flex-col items-center">
      {image && <img src={image} alt="" className="w-[200px] h-auto mb-4" />}

      <form onSubmit={onSubmit} className="w-3/4 ">
        <TextInput
          type="text"
          title={"title"}
          value={data.title}
          name={"title"}
          onChange={onChange}
        />

        <div className="relative">
          <div className="flex flex-col mt-4">
            <label className="border rounded-lg p-4" htmlFor="imageUrl">
              Tải ảnh lên
            </label>
          </div>
          <input
            type="file"
            name="imageUrl"
            id="imageUrl"
            onChange={onChangeImage}
            className="opacity-0 h-1 w-1 absolute left-0"
            required={!image}
          />
        </div>

        <select
          name="type"
          onChange={onChange}
          value={data.type}
          className="w-full border p-2 rounded mt-4"
          required
        >
          <option value="">Chọn khoa cho bài tạp chí</option>
          {Commons.selection().typeMagazine.map((item) => (
            <option value={item.type} key={item.type}>
              {item.title}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-green-500 text-white rounded mt-4 py-2 w-1/4"
        >
          {loading
            ? "Đang xử lý ..."
            : location?.state?.status === "Edit"
            ? "Sửa"
            : "Thêm trang"}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-red-500 ml-4 text-white rounded mt-4 py-2 w-1/4"
        >
          Hủy
        </button>
      </form>
    </div>
  );
}

export default AddMagazine;
