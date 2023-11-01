//importing hooks
import { Outlet, useLocation } from "react-router-dom";

//import icons
import { GrAnalytics } from "react-icons/gr";

const Reports = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="w-[95%] mx-auto">
      <div className="flex items-center justify-between">
        <div className="mt-4">
          <div className="w-16 h-1 bg-purple-400"></div>
          <h4 className="text-xl font-medium text-gray-600">Reports</h4>
        </div>
      </div>
      <div className="flex gap-3 justify-between items-start">
        <aside className="py-6">
          <ul className="flex flex-col gap-8 mt-2">
            <li className="">
              <a
                href="/reports"
                className="font-medium text-gray-700 hover:text-black flex items-center gap-2 border-l-4 px-2 border-transparent"
                style={{
                  borderColor: path === "/reports" && "#21c55d",
                }}
              >
                <GrAnalytics />
                <div className="hidden md:block">Attendance</div>
              </a>
            </li>
            {/* <li className="">
              <a
                href="/reports/summary"
                className="font-medium text-gray-700 hover:text-black flex items-center gap-2 border-l-4 px-2 border-transparent"
                style={{
                  borderColor: path === "/reports/summary" && "#21c55d",
                }}
              >
                <GrAnalytics />
                <div className="hidden md:block">Summary</div>
              </a>
            </li> */}
          </ul>
        </aside>
        <main className="mt-8 border bg-gray-100 rounded-lg py-6 px-4 flex-1 mb-16 overflow-x-scroll scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default Reports;
