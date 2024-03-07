import Articles from "~/components/Articles";
import Footer from "~/components/Footer";

function Home() {
  return (
    <>
      <div className="py-10 md:px-32 px-10 md:flex items-center w-full border-b bg-gradient-to-br to-primary from-green-100">
        <div className="md:w-1/2">
          <strong>Khám phá những điều kỳ diệu của khoa học</strong>
          <p>
            Đi sâu vào những khám phá và đổi mới mới nhất trong thế giới khoa
            học.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="w-[500px] h-[500px] bg-primary"></div>
        </div>
      </div>

      <div className="py-10 md:px-32 px-4 flex xl:flex-row flex-col items-center w-full border-b">
        <div className="xl:w-1/2">
          <strong className="hidden xl:block">Bài viết nổi bật</strong>
          <p className="py-4">
            Hãy xem những lựa chọn hàng đầu của chúng tôi về các chủ đề khoa học
            hấp dẫn.
          </p>
        </div>
        <div className="w-full flex flex-col xl:flex-row xl:w-1/2 ">
          <div className="px-4 w-full flex flex-col items-center xl:w-1/2 py-4">
            <div className="w-full md:w-1/2 h-[300px] bg-primary xl:w-[200px] xl:h-[200px] "></div>
            <p className="text-center my-2">Title</p>
            <p className="font-medium text-center">Description</p>
          </div>
          <div className="px-4 w-full flex flex-col items-center xl:w-1/2 py-4">
            <div className="w-full md:w-1/2 h-[300px] bg-primary xl:w-[200px] xl:h-[200px] "></div>
            <p className="text-center my-2">Title</p>
            <p className="font-medium text-center">Description</p>
          </div>
        </div>
      </div>

      <div className="md:px-32 px-4 ">
        <div className="font-bold mt-4">Bài viết</div>
        <div className="md:px-32 py-10">
          <Articles />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
