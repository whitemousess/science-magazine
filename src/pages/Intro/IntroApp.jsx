import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import ImageApp from "~/assets/INTRO_APP.png";
import ImageApp2 from "~/assets/INTRO_APP2.png";

function IntroApp() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Ứng dụng di động</h1>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-semibold mb-4">Mô tả:</h2>
            <p className="text-gray-700 mb-4">
              &nbsp;&nbsp;&nbsp;Ứng dụng tạp chí là một nền tảng kỹ thuật số cho
              phép người dùng đọc và tương tác với các bài viết từ nhiều tạp chí
              khác nhau trên thiết bị di động hoặc máy tính bảng. Những ứng dụng
              này mang lại nhiều tiện ích cho người dùng cũng như nhà xuất bản,
              bao gồm:
            </p>

            <h2 className="text-xl font-semibold mb-4">
              Tiện lợi và linh hoạt:
            </h2>
            <p className="text-gray-700 mb-4">
              &nbsp;&nbsp;&nbsp;Người dùng có thể dễ dàng truy cập vào hàng ngàn
              tạp chí và bài viết từ bất kỳ đâu, vào bất kỳ lúc nào mà không cần
              mang theo tạp chí giấy. Điều này giúp tiết kiệm không gian và dễ
              dàng tìm kiếm nội dung.
            </p>
            <h2 className="text-xl font-semibold mb-4">Cập nhật nhanh chóng</h2>
            <p className="text-gray-700 mb-4">
              &nbsp;&nbsp;&nbsp;Ứng dụng tạp chí thường cập nhật nội dung mới
              nhất ngay khi có, giúp người đọc tiếp cận thông tin một cách nhanh
              chóng và chính xác.
            </p>
            <h2 className="text-xl font-semibold mb-4">Đa dạng nội dung</h2>
            <p className="text-gray-700 mb-4">
              &nbsp;&nbsp;&nbsp;Các ứng dụng này cung cấp nhiều loại tạp chí với
              nhiều chủ đề khác nhau như thời trang, sức khỏe, kinh doanh, công
              nghệ, giải trí, v.v. Điều này giúp đáp ứng nhu cầu đa dạng của
              người đọc.
            </p>
            <h2 className="text-xl font-semibold mb-4">
              Thân thiện với môi trường
            </h2>
            <p className="text-gray-700 mb-4">
              &nbsp;&nbsp;&nbsp;Việc sử dụng tạp chí điện tử giúp giảm thiểu
              lượng giấy sử dụng, góp phần bảo vệ môi trường.
            </p>

            <h2 className="text-xl font-semibold mb-4">Hình ảnh chi tiết</h2>
            <img src={ImageApp} alt="Image" className="mb-4" />
            <img src={ImageApp2} alt="Image" />

            <h2 className="text-xl font-semibold mb-4 text-center my-4">Tải về</h2>
           <div className="flex justify-around">
                <Link className="flex justify-center items-center border px-10 py-4 rounded-2xl shadow hover:shadow-inner">
                  <FaAppStoreIos className="mr-1" size={32} />
                  Coming soon
                </Link>
                <Link
                  to="https://drive.google.com/file/d/1Am_xpqDH4hdpyCKWlLiFiBvePy6ikO-t/view?usp=drive_link"
                  className="flex justify-center items-center border px-10 py-4 rounded-2xl shadow hover:shadow-inner"
                >
                  <FaGooglePlay className="mr-1" size={32} /> Download file APK
                </Link>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default IntroApp;
