function EmptyClient({ title }) {
  return (
    <div className="py-10 flex justify-center items-center font-bold">
      {title || "Không có dữ liệu"}
    </div>
  );
}

export default EmptyClient;
