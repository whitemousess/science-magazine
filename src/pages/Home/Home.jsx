import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import routes from "~/config/routes";
import ListArticles from "~/components/ListArticles";
import { getAllArticles } from "~/services/articlesService";

function Home() {
  const [dataArticles, setDataArticles] = useState([]);

  useEffect(() => {
    getAllArticles({ page: 1, perPage: 5 })
      .then((data) => setDataArticles(data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="py-10 md:px-32 px-10 md:flex items-center w-full border-b bg-gradient-to-br to-primary from-green-100">
        <div className="md:w-1/2">
          <strong>Khám phá những điều kỳ diệu của khoa học</strong>
          <p>
            Đi sâu vào những khám phá và đổi mới mới nhất trong thế giới khoa
            học.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          {/* <div className="w-[500px] h-[500px] bg-primary"></div> */}
          <img
            src="public/logo.png"
            alt=""
            className="w-[500px] h-auto"
            style={{ filter: "drop-shadow(15px 15px 5px rgba(0,0,0,.6)" }}
          />
        </div>
      </div>

      <div className="py-10 md:px-32 px-4 flex xl:flex-row flex-col items-center w-full border-b">
        <div className="xl:w-1/2">
          <strong className="hidden xl:block">Bài viết nổi bật</strong>
          <p className="py-4">
            Hãy xem những lựa chọn hàng đầu của chúng tôi về các chủ đề khoa học
            hấp dẫn.
          </p>
        </div>
        <div className="w-full flex flex-col xl:flex-row xl:w-1/2 ">
          <div className="px-4 w-full flex flex-col items-center xl:w-1/2 py-4">
            <Link
              to={"/articles/1234"}
              className="w-full md:w-1/2 h-[300px] bg-primary xl:w-[200px] xl:h-[200px]"
            ></Link>
            <p className="text-center my-2">Title</p>
            <p className="font-medium text-center">Description</p>
          </div>
          <div className="px-4 w-full flex flex-col items-center xl:w-1/2 py-4">
            <Link
              to={"/articles/1234"}
              className="w-full md:w-1/2 h-[300px] bg-primary xl:w-[200px] xl:h-[200px] "
            ></Link>
            <p className="text-center my-2">Title</p>
            <p className="font-medium text-center">Description</p>
          </div>
        </div>
      </div>

      <ListArticles data={dataArticles} />

      <div className="flex justify-center">
        <Link
          to={routes.articles}
          className="border px-4 py-2 rounded-xl hover:bg-primary hover:text-white hover:font-medium"
        >
          Xem thêm
        </Link>
      </div>
    </>
  );
}

export default Home;
