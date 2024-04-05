import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import routes from "~/config/routes";
import ListArticles from "~/components/ListArticles";
import { getAllArticles } from "~/services/articlesService";
import Logo from "~/assets/logo.png";

function Home() {
  const [dataArticles, setDataArticles] = useState([]);

  const fetchData = useCallback(() => {
    getAllArticles({ page: 1, perPage: 5 })
      .then((data) => setDataArticles(data.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
          <img
            src={Logo}
            alt=""
            className="w-[500px] h-auto"
            style={{ filter: "drop-shadow(15px 15px 5px rgba(0,0,0,.6)" }}
          />
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
