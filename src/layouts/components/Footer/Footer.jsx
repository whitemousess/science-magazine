import { IoMdArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";
import routes from "~/config/routes";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-4 text-white py-4 bg-primary w-full">
      <div className="container mx-auto flex justify-center">
        <div className="flex flex-col">
          <p>&nbsp;&nbsp;&nbsp;THÔNG TIN</p>
          <Link
            className="hover:underline py-1 flex items-center"
            to={routes.introMagazine}
          >
            <IoMdArrowDropright />
            Giới thiệu
          </Link>
          <Link
            className="hover:underline py-1 flex items-center"
            to={routes.introContact}
          >
            <IoMdArrowDropright />
            Liên hệ
          </Link>
          <Link
            className="hover:underline py-1 flex items-center"
            to={routes.introCopyright}
          >
            <IoMdArrowDropright />
            Chính sách bảo mật
          </Link>
        </div>
        <div className="flex flex-col mx-28">
          Thông tin liên hệ:
          <a href="tel:032870948111">0328709485</a>
          <a href="mailto:thangcoiofficial@gmail.com">
            thangcoiofficial@gmail.com
          </a>
        </div>
        <div className="flex flex-col">
          Địa chỉ:
          <a href="https://maps.app.goo.gl/6qYw5wTBpzRqXpQk7">
            Hà Đông - Hà Nội - Việt Nam
          </a>
        </div>
      </div>

      <p className="text-center py-2">
        &copy; {currentYear} Bản quyền của Ngọc Thắng.
      </p>
    </footer>
  );
}

export default Footer;
