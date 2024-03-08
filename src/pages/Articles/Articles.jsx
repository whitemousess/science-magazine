import ListArticles from "~/components/ListArticles";

function Articles() {
  const data = [
    { _id: 1, imageUrl: "", imageStatus: "", status: "" },
    { _id: 2, imageUrl: "", imageStatus: "", status: "" },
    { _id: 3, imageUrl: "", imageStatus: "", status: "" },
    { _id: 4, imageUrl: "", imageStatus: "", status: "" },
  ];

  return <ListArticles data={data} />;
}

export default Articles;
