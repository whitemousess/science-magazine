import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "~/services/userService";
import { AuthContext } from "~/shared/AuthProvider";

function EditUser() {
  const { id } = useParams();
  const { editProfile } = useContext(AuthContext);
  const [data, setData] = useState({
    password: "",
    rePassword: "",
    fullName: "",
    email: "",
    gender: 0,
    imageUrl: "",
  });
  const [image, setImage] = useState("");

  const onChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
    const file = e.target.files;
    if (file && file[0].type.startsWith("image/")) {
      const img = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      };
      setImage(img.preview);
      setData({ ...data, imageUrl: img.data });
    }
  };

  useEffect(() => {
    getUserById({ id })
      .then((user) => {
        setData({
          id: user.data._id,
          password: "",
          rePassword: "",
          fullName: user.data.fullName,
          email: user.data.email,
          gender: user.data.gender,
          imageUrl: user.data.imageUrl,
        });
        setImage(user.data.imageUrl);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    editProfile(data);
  };

  return (
    <form onSubmit={onSubmit} className="w-3/4 mx-auto mt-10">
      {image && (
        <img src={image} alt="" className="rounded-lg w-auto h-[200px] mb-4" />
      )}
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 ">
          <input
            type="password"
            name="password"
            id="password"
            value={data.password}
            onChange={onChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 ">
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            value={data.rePassword}
            onChange={onChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Re password
          </label>
        </div>
      </div>
      <div className="relative z-0 w-full mb-5 ">
        <input
          type="text"
          name="fullName"
          id="fullName"
          value={data.fullName}
          onChange={onChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="fullName"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Full name
        </label>
      </div>

      <div className="mb-3">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            name="gender"
            checked={data.gender == 0}
            value={0}
            onChange={onChange}
          />
          <span className="ml-2">Male</span>
        </label>
        <label className="inline-flex items-center ml-4">
          <input
            type="radio"
            className="form-radio"
            name="gender"
            value={1}
            checked={data.gender == 1}
            onChange={onChange}
          />
          <span className="ml-2">Female</span>
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 ">
        <input
          type="email"
          name="email"
          id="email"
          value={data.email}
          onChange={onChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
      </div>

      <div className="flex flex-col mb-4">
        <label
          className="mb-2 text-sm font-medium text-gray-900 border rounded-lg p-4"
          htmlFor="file_input"
        >
          Upload avatar
        </label>
      </div>

      <div className="w-full">
        <button
          type="submit"
          className="bg-primary text-white hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Thay đổi
        </button>
      </div>

      <input
        className="opacity-0"
        id="file_input"
        type="file"
        accept="image/*"
        name="imageUrl"
        onChange={onChange}
      />
    </form>
  );
}

export default EditUser;
