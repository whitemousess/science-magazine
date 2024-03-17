import { useEffect, useState } from "react";
import ListArticles from "~/components/ListArticles";
import { getAllArticles } from "~/services/articlesService";

function Articles() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllArticles({ page: 1, perPage: 5 })
      .then((data) => setData(data.data))
      .catch((error) => console.log(error));
  }, []);

  return <ListArticles data={data} />;
}

export default Articles;
