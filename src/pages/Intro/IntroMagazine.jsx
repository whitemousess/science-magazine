import Logo from "~/assets/Logo.png";

function IntroMagazine() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-2/4">
        <h2 className="my-4">&nbsp;Giới thiệu tạp chí khoa học</h2>

        <div className=" flex justify-center">
          <img
            src={Logo}
            alt="a"
            className="w-64 h-6w-64 my-10"
            style={{ filter: "drop-shadow(10px 10px 5px rgba(0,0,0,.6)" }}
          />
        </div>

        <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tôn chỉ, mục đích, phạm vi</h3>
        <p className="my-2 ">
          &nbsp;&nbsp;&nbsp;Tạp chí KH&CN Việt Nam bản B là tạp chí khoa học có
          uy tín của Bộ Khoa học và Công nghệ được xuất bản từ năm 2015, chuyên
          đăng tải các bài báo khoa học (research article) và bài báo tổng quan
          (review article) bằng tiếng Việt có chất lượng tốt, nổi bật trong các
          lĩnh vực khoa học (được phản biện kín).
        </p>
        <p className="my-2 ">Các lĩnh vực cụ thể:</p>
        <p className="my-2 italic">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1: Khoa học tự nhiên;
        </p>
        <p className="my-2 italic">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2 : Khoa học kỹ thuật và công nghệ;{" "}
        </p>
        <p className="my-2 italic">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3 : Khoa học y dược;{" "}
        </p>
        <p className="my-2 italic">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4 : Khoa học nông nghiệp;{" "}
        </p>
        <p className="my-2 italic">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5 : Khoa học xã hội và nhân văn.
        </p>
        <p className="my-2 ">
          Tần suất xuất bản: Mỗi tháng xuất bản 01 số Tạp chí Khoa học và Công
          nghệ Việt Nam bản B với 12-15 bài báo khoa học (80 trang từ năm 2024),
          thuộc một hoặc một vài lĩnh vực khoa học gần nhau.
        </p>
        <h3 className="mt-4 my-2">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tạp chí Khoa học và Công nghệ Việt Nam
          bản B, P-ISSN 1859-4794, E-ISSN 2615-9929:
        </h3>

        <p className="my-2 italic">
          - Được xuất bản hàng tháng bằng tiếng Việt; có tiêu đề, tóm tắt và từ
          khóa bằng tiếng Anh; được phản biện kín bởi ít nhất 2 phản biện độc
          lập; gắn DOI khi xuất bản;
        </p>

        <p className="my-2 italic">
          - Xuất bản công trình nghiên cứu trong 05 lĩnh vực: khoa học tự nhiên,
          kỹ thuật và công nghệ, khoa học y - dược, khoa học nông nghiệp, khoa
          học xã hội và nhân văn;
        </p>

        <p className="my-2 italic">
          - Tuân theo các tiêu chuẩn quốc tế của một tạp chí khoa học bao gồm:
          định dạng theo chuẩn quốc tế, ban biên tập chuyên ngành, phản biện
          kín, kiểm tra đạo văn, hiệu đính ngôn ngữ tiếng Anh (với tên bài, tóm
          tắt và từ khóa bằng tiếng Anh), gắn số DOI khi xuất bản.
        </p>

        <h3 className="mt-4 my-2">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Đối tượng phục vụ
        </h3>
        <p className="my-2 italic">
          Tạp chí khoa học phục vụ cho một đối tượng rộng lớn bao gồm cán bộ,
          giảng viên, học viên, sinh viên của Trường và mọi người quan tâm đến
          lĩnh vực đào tạo và nghiên cứu khoa học trong lĩnh vực tài nguyên và
          môi trường.
        </p>
        <p className="my-2 italic">
          Đối tượng này tìm kiếm thông tin phong phú và đa dạng về quản lý tài
          nguyên, môi trường và phát triển bền vững, cũng như các công nghệ kỹ
          thuật môi trường, và các lĩnh vực kinh tế - xã hội liên quan.
        </p>
      </div>
    </div>
  );
}

export default IntroMagazine;
