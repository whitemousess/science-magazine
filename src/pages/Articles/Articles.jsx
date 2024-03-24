import { useCallback, useEffect, useState } from "react";
import ListArticles from "~/components/ListArticles";
import { getAllArticles } from "~/services/articlesService";

function Articles() {
  const [data, setData] = useState([]);

  const fetchData = useCallback(() => {
    getAllArticles({ page: 1, perPage: 5 })
      .then((data) => setData(data.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <ListArticles data={data} />;
}

export default Articles;
