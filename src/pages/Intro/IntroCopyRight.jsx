function IntroCopyRight() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">
            Thông tin bản quyền
          </h1>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-semibold mb-4">Về chúng tôi</h2>
            <p className="text-gray-700 mb-4">
              Trang web này được sở hữu và được điều hành bởi Ngọc Thắng.
            </p>
            <h2 className="text-xl font-semibold mb-4">Tông báo bản quyền</h2>
            <p className="text-gray-700 mb-4">
              &copy; {currentYear} Bản quyền của Ngọc Thắng.Đã đăng ký bản
              quyền.
            </p>
            <h2 className="text-xl font-semibold mb-4">Liên hệ</h2>
            <p className="text-gray-700 mb-4">
              Nếu có bất kỳ thắc mắc nào liên quan đến bản quyền hoặc quyền, vui
              lòng gửi email cho chúng tôi theo địa chỉ{" "}
              <a href="mailto:thangcoiofficial@gmail.com">
                thangcoiofficial@gmail.com
              </a>{" "}
              hoặc{" "}
              <a href="tel:032870948111">
                032870948111
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroCopyRight;
