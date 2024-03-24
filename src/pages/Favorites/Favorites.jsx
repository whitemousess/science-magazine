import { useContext } from "react";
import ListArticles from "./ListArticles";
import { AuthContext } from "~/shared/AuthProvider";

function Favorites() {
  const token = useContext(AuthContext);

  if (!token) {
    return;
  }

  return <ListArticles />;
}

export default Favorites;
