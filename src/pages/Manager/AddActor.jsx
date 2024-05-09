import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Commons } from "~/Common/Commons";
import { getDistrict, getProvince } from "~/services/provinceService";
import { AuthContext } from "~/shared/AuthProvider";

function AddActor() {
  const location = useLocation();
  const { status, dataActor, isLoading } = location?.state;
  const { addActor, editActor } = useContext(AuthContext);
  const [data, setData] = useState({
    username: "",
    password: "",
    rePassword: "",
    fullName: "",
    email: "",
    gender: 0,
    imageUrl: "",
    role: 2,
    province: "",
    districts: "",
    phone: "",
    biography: "",
    education: "",
    academic_degree: "",
    dob: "",
  });
  const [image, setImage] = useState("");
  const [provinceSelect, setProvinceSelect] = useState([]);
  const [districtSelect, setDistrictSelect] = useState([]);

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

  const onSubmit = (e) => {
    e.preventDefault();
    if (status === "Edit") {
      editActor(data);
    } else {
      addActor(data);
    }
  };

  const handleSelect = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const newData = { ...data };
    newData[key] = value;

    if (key === "province") {
      if (data.province !== "" && data.province !== value) {
        setData({ ...data, province: value, districts: "" });
      } else {
        setData(newData);
      }
    } else {
      setData(newData);
    }
  };

  useEffect(() => {
    getProvince()
      .then((result) => {
        setProvinceSelect(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (data.province) {
      const findProvince = () => {
        return provinceSelect.filter(
          (province) => province.name === data.province
        );
      };

      const foundProvince = findProvince();
      if (foundProvince.length > 0) {
        getDistrict(foundProvince[0]?.code)
          .then((result) => {
            setDistrictSelect(result.districts);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [data.province, provinceSelect]);

  useEffect(() => {
    if (status === "Edit") {
      setData({
        id: dataActor._id,
        username: dataActor.username,
        fullName: dataActor.fullName,
        email: dataActor.email,
        gender: dataActor.gender,
        imageUrl: dataActor.imageUrl,
        role: dataActor.role,
        province: dataActor.province,
        districts: dataActor.districts,
        phone: dataActor.phone,
        biography: dataActor.biography,
        education: dataActor.education,
        academic_degree: dataActor.academic_degree,
        dob: dataActor.dob,
      });
      setImage(dataActor?.imageUrl);
    }
  }, [dataActor, status]);

  return (
    <form onSubmit={onSubmit} className="w-3/4 mx-auto mt-10">
      {image && (
        <img src={image} alt="" className="rounded-lg w-auto h-[200px] mb-4" />
      )}

      {status !== "Edit" && (
        <div className="relative z-0 w-full mb-5 ">
          <input
            type="text"
            name="username"
            id="username"
            value={data.username}
            onChange={onChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="username"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tài khoản
          </label>
        </div>
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
            required={status !== "Edit"}
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mật khẩu
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
            required={status !== "Edit"}
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nhập lại mật khẩu
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
          Họ và tên
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
          Địa chỉ email
        </label>
      </div>

      <div className="w-full">
        <select
          required
          name="province"
          className="w-2/6 p-2 rounded-lg mb-5 border mr-2"
          onChange={handleSelect}
          value={data.province}
        >
          <option value="">Chọn tỉnh thành</option>
          {provinceSelect.map((item) => (
            <option key={item.code} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <select
          required
          name="districts"
          className="w-2/6 p-2 rounded-lg mb-5 border mr-2"
          onChange={handleSelect}
          value={data.districts}
        >
          <option value="">Chọn quận huyện</option>
          {districtSelect.map((item) => (
            <option key={item.code} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          name="academic_degree"
          className="w-[400px] p-2 rounded-lg mb-5 border mr-2"
          required
          onChange={onChange}
          value={data.academic_degree}
        >
          <option value="">Học vấn</option>
          {Commons.selection().academicDegree.map((item) => (
            <option value={item.type} key={item.type}>
              {item.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 ">
          <input
            type="text"
            name="phone"
            id="phone"
            value={data.phone}
            onChange={onChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Số điện thoại
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 ">
          <input
            type="date"
            name="dob"
            id="dob"
            value={data.dob}
            onChange={onChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="dob"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Ngày sinh
          </label>
        </div>
      </div>

      <div className="relative z-0 w-full mb-5 ">
        <textarea
          type="biography"
          name="biography"
          id="biography"
          value={data.biography}
          onChange={onChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="biography"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Tiểu sử
        </label>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 ">
          <input
            type="text"
            name="education"
            id="education"
            value={data.education}
            onChange={onChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="education"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tốt nghiệp tại trường
          </label>
        </div>
        <div className="mb-3 inline-flex items-center">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="gender"
              checked={data.gender == 0}
              value={0}
              onChange={onChange}
            />
            <span className="ml-2">Nam</span>
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
            <span className="ml-2">Nữ</span>
          </label>
        </div>
      </div>

      <div className="flex flex-col mb-4">
        <label
          className="mb-2 text-sm font-medium text-gray-900 border rounded-lg p-4"
          htmlFor="file_input"
        >
          Tải ảnh đại diện
        </label>
      </div>

      <div className="w-full">
        <button
          type="submit"
          className="bg-primary text-white hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          {status === "Edit" ? "Thay đổi" : "Thêm tác giả"}
        </button>
      </div>

      <input
        className="opacity-0"
        id="file_input"
        type="file"
        accept="image/*"
        name="imageUrl"
        onChange={onChange}
        required={status !== "Edit"}
      />
    </form>
  );
}

export default AddActor;
