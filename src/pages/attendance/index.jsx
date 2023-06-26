//importing hooks
import { useQuery } from "@tanstack/react-query";
import { fetchAttendance } from "../../api/attendance/index";

//importing components
import { SyncLoader } from "react-spinners";
import RowData from "./rowdata";

const Attendance = () => {
  const attendanceQuery = useQuery({
    queryKey: ["ATTENDANCE"],
    queryFn: () => fetchAttendance(),
  });
  return (
    <div className="w-full max-w-[95%] mx-auto">
      <div className="mt-4">
        <div className="w-16 h-1 bg-red-400"></div>
        <h4 className="text-xl font-medium text-gray-600">Attendance</h4>
      </div>
      <div className="overflow-x-scroll">
        <table className="w-full mt-8">
          <thead>
            <tr className="bg-green-500">
              <th className="text-white text-sm font-medium py-4 px-4 rounded-tl-lg rounded-bl-lg whitespace-nowrap text-left">
                Date
              </th>
              <th className="text-white text-sm font-medium py-4 px-4 whitespace-nowrap text-left">
                First Name
              </th>
              <th className="text-white text-sm font-medium py-4 px-4 whitespace-nowrap text-left">
                Last Name
              </th>
              <th className="text-white text-sm font-medium py-4 px-4 whitespace-nowrap text-left">
                Department
              </th>
              <th className="text-white text-sm font-medium py-4 px-4 whitespace-nowrap text-left">
                Check in
              </th>
              <th className="text-white text-sm font-medium py-4 px-4 rounded-tr-lg rounded-br-lg whitespace-nowrap text-left">
                Check out
              </th>
            </tr>
          </thead>
          <tbody>
            {attendanceQuery.isSuccess &&
              attendanceQuery.data.data.data.map(
                ({
                  first_name,
                  last_name,
                  check_in,
                  check_out,
                  name,
                  employee_id,
                  id,
                }) => {
                  return (
                    <RowData
                      firstName={first_name}
                      lastName={last_name}
                      checkIn={check_in}
                      checkOut={check_out}
                      department={name}
                      key={id}
                    />
                  );
                }
              )}
          </tbody>
        </table>
        {attendanceQuery.isLoading && (
          <div className="w-full flex justify-center mt-8">
            <SyncLoader color="#199432" size={8} />
          </div>
        )}
      </div>
    </div>
  );
};
export default Attendance;
