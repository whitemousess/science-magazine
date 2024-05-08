import { useEffect, useState } from "react";
import { getTopView } from "~/services/viewMagazineService";
import Bars from "../Chart/Bars";

function BarChartHome() {
  const [labelsMonths, setLabelsMonths] = useState([]);
  const [dataBar, setDataBar] = useState([]);

  useEffect(() => {
    getTopView().then((month) => {
      const filteredDataByMonth = [];
      const filteredDataBarByMonth = [];

      for (let i = 1; i <= 12; i++) {
        const filteredMonthData = month.data.find(
          (item) => item.month === `Tháng ${i}`
        );
        if (filteredMonthData) {
          filteredDataByMonth.push(filteredMonthData.month);
          filteredDataBarByMonth.push(filteredMonthData.count);
        }
      }

      setLabelsMonths(filteredDataByMonth);
      setDataBar(filteredDataBarByMonth);
    });
  }, []);

  return (
    <div className="w-full flex justify-center">
      <Bars
        title={"Tương tác theo tháng"}
        labels={labelsMonths}
        dataBar={dataBar}
      />
    </div>
  );
}

export default BarChartHome;
