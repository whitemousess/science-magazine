import { Link } from "react-router-dom";

import routes from "~/config/routes";
import Logo from "~/assets/Logo.png";
import IssueNumber from "../IssueNumber";

function Home() {
  return (
    <div className="flex flex-col">
      <div className="py-10 md:px-32 px-10 md:flex items-center w-full border-b bg-gradient-to-br to-primary from-green-100">
        <div className="md:w-1/2">
          <strong>&nbsp;Chào mừng đến với Tạp chí Khoa học!</strong>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tạp chí Khoa học rất vinh dự
            được đồng hành cùng quý vị trên hành trình khám phá tri thức khoa
            học bao la và đầy thú vị. Với sứ mệnh lan tỏa thông tin khoa học uy
            tín, chính xác và dễ hiểu, chúng tôi cam kết mang đến cho quý vị
            những bài viết chất lượng cao về mọi lĩnh vực khoa học, từ vật lý,
            hóa học, sinh học đến y học, công nghệ và khoa học xã hội.
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ngoài ra, Tạp chí Khoa học còn
            là diễn đàn mở để quý độc giả có thể chia sẻ ý kiến, thảo luận và
            tranh luận về các vấn đề khoa học. Chúng tôi luôn mong muốn nhận
            được những đóng góp của quý vị để Tạp chí Khoa học ngày càng hoàn
            thiện và phát triển hơn nữa.
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
