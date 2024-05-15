import { Link } from "react-router-dom";

import routes from "~/config/routes";
import Logo from "~/assets/Logo.png";
import IssueNumber from "../IssueNumber";

function Home() {
  return (
    <div className="flex flex-col">
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
            className="w-[200px] h-auto"
            style={{ filter: "drop-shadow(15px 15px 5px rgba(0,0,0,.6)" }}
          />
        </div>
      </div>
      <div className="my-4">
        <IssueNumber />
      </div>

      <div className="flex justify-center mb-4">
        <Link
          to={routes.issueNumber}
          className="border px-4 py-2 rounded-xl hover:bg-primary hover:text-white hover:font-medium"
        >
          Xem thêm
        </Link>
      </div>
    </div>
  );
}

export default Home;
