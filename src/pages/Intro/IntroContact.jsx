function IntroContact() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">
            Liên hệ đăng tạp chí
          </h1>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-semibold mb-4">Địa chỉ</h2>
            <p className="text-gray-700 mb-4">Hà Đông - Hà Nội - Viêt Nam</p>
            <h2 className="text-xl font-semibold mb-4">Số điện thoại</h2>
            <p className="text-gray-700 mb-4"> <a href="tel:03287094111">03287094111</a></p>
            <h2 className="text-xl font-semibold mb-4">Email</h2>
            <p className="text-gray-700 mb-4"><a href="mailto:thangcoiofficial@gmail.com">thangcoiofficial@gmail.com</a></p>
            <h2 className="text-xl font-semibold mb-4">Giờ làm việc</h2>
            <p className="text-gray-700 mb-4">
              Thứ 2 - Thứ 6 : 9:00 AM - 5:00 PM <br />
              Thứ 7 - Chủ Nhật : Đóng cửa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroContact;
