function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 mt-4">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-600">
          &copy; {currentYear} Bản quyền của Ngọc Thắng.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
