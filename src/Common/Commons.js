export const Commons = {
  selection() {
    const typeMagazine = [
      {
        title: "Khoa Công nghệ thông tin",
        type: "CNTT",
      },
      {
        title: "Khoa kế toán",
        type: "KT",
      },
      {
        title: "Khoa Môi trường",
        type: "MT",
      },
    ];

    const publishingYear = [
      {
        title: "Tất cả",
        type: "",
      },
      {
        title: "2024",
        type: "2024",
      },
      {
        title: "2023",
        type: "2023",
      },
      {
        title: "2022",
        type: "2022",
      },
      {
        title: "2021",
        type: "2021",
      },
      {
        title: "2020",
        type: "2020",
      },
    ];

    return { typeMagazine, publishingYear };
  },

  formatTime(time) {
    const date = new Date(time);
    return date.toLocaleDateString("vi-vn");
  },

  formatTimeDay(time) {
    const date = new Date(time);
    return date.getDate();
  },

  formatTimeMonth(time) {
    const date = new Date(time);
    return date.getMonth() + 1;
  },

  formatTimeYear(time) {
    const date = new Date(time);
    return date.getFullYear();
  },
};
