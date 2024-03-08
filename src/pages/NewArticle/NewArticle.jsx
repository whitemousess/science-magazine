import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextInput from "~/components/TextInput";

function NewArticle() {
  const [data, setData] = useState({ value: "", title: "" });

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
    ],
  };

  const onChange = () => {};

  return (
    <div className="px-10">
      <TextInput
        required={true}
        type="text"
        title={"Tiêu đề ..."}
        value={data.title}
        name={"title"}
        onChange={onChange}
      />
      <ReactQuill
        theme="snow"
        value={data.value}
        onChange={setData}
        modules={modules}
      />
    </div>
  );
}

export default NewArticle;
