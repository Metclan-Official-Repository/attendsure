//importing hooks
import { useQuery } from "@tanstack/react-query";

//importing services
import { fetchAttendance } from "../../api/attendance/index";
import { fetchEmployee } from "../../api/employees";

//importing components
import { FadeLoader } from "react-spinners";
import RowData from "./rowdata";
import { useState } from "react";

const Attendance = () => {
  const [activeField, setActiveField] = useState(null);
  const [employee, setEmployee] = useState("");
  const handleChange = (e) => setEmployee(e.target.value);
  const handleFocus = (e) => setActiveField(e.target.name);
  const handleBlur = () => setActiveField(null);

  const attendanceQuery = useQuery({
    queryKey: ["ATTENDANCE"],
    queryFn: () => fetchAttendance(),
  });
  const employeeQuery = useQuery({
    queryKey: ["EMPLOYEES"],
    queryFn: () => fetchEmployee(employee),
  });
  return (
    <div className="w-full max-w-[95%] mx-auto">
      <div className="mt-4">
        <div className="w-16 h-1 bg-red-400"></div>
        <h4 className="text-xl font-medium text-gray-600">Attendance</h4>
      </div>
      <div className="mt-4 mb-2 w-1/2 sm:w-96">
        <select
          name={"employee"}
          value={employee}
          onChange={(e) => handleChange(e)}
          onFocus={(e) => handleFocus(e)}
          onBlur={(e) => handleBlur(e)}
          style={{
            borderColor: activeField === "employees" && "#21c55d",
          }}
          className="outline-none text-sm border py-2 px-2 rounded-sm transition bg-white w-full"
          required
        >
          {employeeQuery.isSuccess &&
            employeeQuery.data.data.data.map(
              ({ first_name, last_name, id }) => (
                <option key={id} value={id}>
                  {`${first_name} ${last_name}`}
                </option>
              )
            )}
        </select>
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
        <div className="w-full flex justify-center mt-8">
          <FadeLoader
            color="#199432"
            height={10}
            width={4}
            margin={-6}
            loading={attendanceQuery.isLoading}
          />
        </div>
      </div>
    </div>
  );
};
export default Attendance;
