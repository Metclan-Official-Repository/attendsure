//import hooks
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

//import components
import { FiUsers } from "react-icons/fi";
import { BiLogInCircle } from "react-icons/bi";
import { TfiFaceSad } from "react-icons/tfi";

//import services
import { overviewSummary } from "../../api/overview";

const OverviewCards = () => {
  const [overViewSummaryCount, setOverviewSummaryCount] = useState({
    totalEmployees: 0,
    totalAbsentEmployees: 0,
    totalPresentEmployees: 0,
  });
  const overSummary = useQuery({
    queryKey: ["OVERVIEW-SUMMARY"],
    queryFn: overviewSummary,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setOverviewSummaryCount(data.data.data);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <div className="flex flex-col gap-4 mt-8 sm:flex-row sm:justify-between">
      {/* Total Employees*/}
      <div className="border rounded-lg px-4 py-8 flex-1 shadow-lg">
        <div className="flex items-center gap-6">
          <div className="border w-10 h-10 flex justify-center items-center rounded-lg bg-green-100">
            <FiUsers className="text-2xl text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              {overViewSummaryCount.totalEmployees}
            </h3>
            <p>TOTAL EMPLOYEES</p>
          </div>
        </div>
      </div>
      {/* Employees present */}
      <div className="border rounded-lg px-4 py-8 bg-green-500 flex-1 shadow-lg">
        <div className="flex items-center gap-6">
          <div className="border w-10 h-10 flex justify-center items-center rounded-lg bg-white">
            <BiLogInCircle className="text-2xl text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">
              {overViewSummaryCount.totalPresentEmployees}
            </h3>
            <p className="text-white">Present Today</p>
          </div>
        </div>
      </div>
      {/* Employees present */}
      <div className="border rounded-lg px-4 py-8 flex-1 shadow-lg">
        <div className="flex items-center gap-6">
          <div className="border w-10 h-10 flex justify-center items-center rounded-lg bg-green-100">
            <TfiFaceSad className="text-2xl text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              {overViewSummaryCount.totalAbsentEmployees}
            </h3>
            <p>Absent Today</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OverviewCards;
