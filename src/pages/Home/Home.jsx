import Articles from "~/components/Articles";
import Footer from "~/components/Footer";

function Home() {
  return (
    <div className="px-32">
      <div className="py-10 flex items-center w-full border-b">
        <div className="w-1/2">
          <div>
            <strong>Khám phá những điều kỳ diệu của khoa học</strong>
            <p>
              Đi sâu vào những khám phá và đổi mới mới nhất trong thế giới khoa
              học.
            </p>
          </div>
        </div>
        <div className="w-1/2 flex justify-center">
          <div className="w-[500px] h-[500px] bg-primary"></div>
        </div>
      </div>

      <div className="py-10 flex items-center w-full border-b">
        <div className="w-1/2">
          <div>
            <strong>Bài viết nổi bật</strong>
            <p>
              Hãy xem những lựa chọn hàng đầu của chúng tôi về các chủ đề khoa
              học hấp dẫn.
            </p>
          </div>
        </div>
        <div className="w-1/2 flex justify-center">
          <div className="mx-4">
            <div className="w-[200px] h-[200px] bg-primary"></div>
            <p>Title</p>
            <p className="font-medium">Description</p>
          </div>
          <div className="mx-4">
            <div className="w-[200px] h-[200px] bg-primary"></div>
            <p>Title</p>
            <p className="font-medium">Description</p>
          </div>
        </div>
      </div>

      <div className="font-bold mt-4">Bài viết</div>
      <div className="px-32 py-10">
        <Articles />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
