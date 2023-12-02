//import libraries, hooks and functions
import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery, useQueryClient, useQueries } from "@tanstack/react-query";

//importing constant data
import { attentanceTable } from "../../constants";

//import components
import { SkeletonLoaderTable } from "../../components";
import { DatePicker } from "rsuite";

//import services
import { reportSummary } from "../../api/reports";
import { fetchDepartments } from "../../api/departments";
import { fetchEmployee } from "../../api/employees";
import { fetchShift } from "../../api/shift";
import { fetchLocations } from "../../api/locations";

//import helper functions
import { addDays } from "date-fns";
//import icons
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

//table configs
const columnHelper = createColumnHelper();

const Attendance = () => {
  const [pageCount, setPageCount] = useState(0);
  //Filter options renders all the fetched filters on the page
  const [filterOptions, setFilterOptions] = useState({
    departmentId: 0,
    employeeId: 0,
    shiftId: 0,
    locationId: 0,
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  //Filters are sent to the server for query operation
  const [filters, setFilter] = useState({
    currentPage: 1,
    shiftId: 0,
    employeeId: 0,
    departmentId: 0,
    locationId: 0,
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const [activeField, setActiveField] = useState(null);
  const columns = attentanceTable.map((column) =>
    columnHelper.accessor(`${column.value}`, {
      cell: (info) => info.getValue(),
    })
  );
  const [data, setData] = useState([]);
  const queryClient = useQueryClient();

  // fetching options for the filter
  const filterQuries = useQueries({
    queries: [
      // Query for all departments
      {
        queryFn: fetchDepartments,
        queryKey: ["DEPARTMENTS"],
        refetchOnWindowFocus: false,
      },
      // Query for all employees
      {
        queryFn: fetchEmployee,
        queryKey: ["EMPLOYEES"],
        refetchOnWindowFocus: false,
      },
      // Query for all shifts
      {
        queryFn: fetchShift,
        queryKey: ["SHIFTS"],
        refetchOnWindowFocus: false,
      },
      // Query for all locations
      {
        queryFn: fetchLocations,
        queryKey: ["LOCATIONS"],
        refetchOnWindowFocus: false,
      },
    ],
  });
  const attendanceSummaryQuery = useQuery({
    queryKey: ["ATTENDANCE_REPORTS"],
    queryFn: () => reportSummary.fetch(filters),
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const formattedData = data.data.data.map(
        ({
          check_in,
          check_out,
          first_name,
          last_name,
          department_name,
          shift_name,
          check_in_method,
        }) => ({
          FirstName: first_name,
          LastName: last_name,
          Department: department_name,
          CheckIn: new Date(parseInt(check_in) * 1000).toLocaleString(),
          CheckOut: check_out
            ? new Date(parseInt(check_out) * 1000).toLocaleString()
            : "Active",
          Shift: shift_name,
          CheckInMethod: check_in_method,
        })
      );
      setPageCount(Math.ceil(data.data.count / 10));
      setData(formattedData);
    },
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  //event handlers
  const handleBlur = () => {};
  const handleFocus = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    setFilter((prev) => ({ ...prev, ...filterOptions, currentPage: 1 }));
    handleRefetch();
  };
  const handleSelect = (e) => {
    setFilterOptions((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleRefetch = async () => {
    await queryClient.invalidateQueries(["ATTENDANCE_REPORTS"]);
    await attendanceSummaryQuery.refetch();
  };
  return (
    <div>
      <div className="">
        <form className="">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            {/* first row */}
            <div className="flex flex-col gap-2 sm:flex-row flex-1">
              {/* Employee name */}
              <div className="flex flex-col gap-1 mt-2 flex-1">
                <div className="flex items-center">
                  <label className="text-sm">Employee's Name</label>
                </div>
                <select
                  name={"employeeId"}
                  value={filterOptions.employeeId}
                  onChange={handleSelect}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onSelect={handleSelect}
                  style={{
                    borderColor: activeField === "employeeId" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition bg-white"
                  disabled={false}
                  required
                >
                  <option value={0} key={0}>
                    -- Please select --
                  </option>
                  {filterQuries[1].isSuccess &&
                    filterQuries[1].data.data.data.map(
                      ({ first_name, last_name, id }) => (
                        <option value={id} key={id}>
                          {`${first_name} ${last_name}`}
                        </option>
                      )
                    )}
                </select>
              </div>
              {/* Employee's Department */}
              <div className="flex flex-col gap-1 mt-2 flex-1">
                <div className="flex items-center">
                  <label className="text-sm">Department</label>
                </div>
                <select
                  name={"departmentId"}
                  value={filterOptions.departmentId}
                  onChange={handleSelect}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onSelect={handleSelect}
                  style={{
                    borderColor:
                      activeField === "employementStatus" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition bg-white"
                  disabled={false}
                  required
                >
                  <option value={0} key={0}>
                    -- Please select --
                  </option>
                  {filterQuries[0].isSuccess &&
                    filterQuries[0].data.data.data.map(({ name, id }) => (
                      <option value={id} key={id}>
                        {name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {/* Second row */}
            <div className="flex flex-col gap-2 sm:flex-row flex-1">
              {/* Shift */}
              <div className="flex flex-col gap-1 mt-2 flex-1">
                <div className="flex items-center">
                  <label className="text-sm">Shift</label>
                </div>
                <select
                  name={"shiftId"}
                  value={filterOptions.shiftId}
                  onChange={handleSelect}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    borderColor: activeField === "shiftId" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition bg-white"
                  disabled={false}
                  required
                >
                  <option value={0} id={0} key={0}>
                    -- Please select --
                  </option>
                  {filterQuries[2].isSuccess &&
                    filterQuries[2].data.data.data.map(({ name, id }) => (
                      <option value={id} key={id}>
                        {name}
                      </option>
                    ))}
                </select>
              </div>
              {/* Business Location */}
              <div className="flex flex-col gap-1 mt-2 flex-1">
                <div className="flex items-center">
                  <label className="text-sm">Business Location</label>
                </div>
                <select
                  name={"locationId"}
                  value={filterOptions.locationId}
                  onChange={handleSelect}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    borderColor: activeField === "locationId" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition bg-white"
                  disabled={false}
                  required
                >
                  <option>-- Please select --</option>
                  {filterQuries[3].isSuccess &&
                    filterQuries[3].data.data.data.map(
                      ({ name, id, location_unique_name }) => (
                        <option value={id} key={id}>
                          {name} {location_unique_name}
                        </option>
                      )
                    )}
                </select>
              </div>
            </div>
          </div>
          {/* Third row  */}
          <div className="flex flex-col gap-2 sm:flex-row mt-2 md:w-1/2">
            {/* From*/}
            <div className="flex flex-col gap-1 mt-2 flex-1">
              <div className="flex items-center">
                <label className="text-sm">From</label>
              </div>
              <DatePicker
                format="yyyy-MM-dd HH:mm:ss"
                value={filterOptions.from}
                onChange={(date) =>
                  setFilterOptions((prev) => ({ ...prev, from: date }))
                }
              />
            </div>
            {/* Tos= */}
            <div className="flex flex-col gap-1 mt-2 flex-1">
              <div className="flex items-center">
                <label className="text-sm">To</label>
              </div>
              <DatePicker
                format="yyyy-MM-dd HH:mm:ss"
                value={filterOptions.to}
                onChange={(date) =>
                  setFilterOptions((prev) => ({ ...prev, to: date }))
                }
              />
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <button
              type={"submit"}
              onClick={handleSubmit}
              className="border py-2 px-6 bg-green-500 text-white rounded-lg transition hover:bg-green-600"
              style={{
                cursor: attendanceSummaryQuery.isLoading
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              Apply Filter
            </button>
          </div>
        </form>
      </div>
      <div className="bg-white px-4 py-4 rounded-2xl w-full overflow-x-scroll mt-10">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left py-4 font-poppins font-semibold text-sm border-b"
                  >
                    <span className="">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {attendanceSummaryQuery.isSuccess &&
            !attendanceSummaryQuery.isFetching && (
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b last:border-none">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="py-4 font-normal text-xs font-poppins [&:nth-child(6)]:text-sm [&:nth-child(5)]:text-sm sm:text-xs"
                      >
                        <span className="px-2 py-1 rounded-lg whitespace-nowrap text-[14px]">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
        </table>
        {attendanceSummaryQuery.isLoading ||
          (attendanceSummaryQuery.isFetching && (
            <SkeletonLoaderTable numberOfRows={8} />
          ))}
      </div>
      <div className="flex justify-start mt-6 gap-4">
        <div className="font-sm">
          <div className="">
            <div className="font-raleway text-sm font-medium">
              Page{" "}
              <div className="border border-black text-xs inline-block px-1 py-[2px] rounded-[5px]">
                {filters.currentPage}
              </div>{" "}
              of {pageCount}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div
            className={`bg-white px-1 py-1 rounded-lg  transition hover:cursor-pointer ${
              filters.currentPage === 1
                ? "hover:cursor-not-allowed text-gray-400"
                : "hover:bg-green-800 hover:text-white"
            }`}
            onClick={() => {
              filters.currentPage > 1 &&
                setFilter((prev) => ({
                  ...prev,
                  currentPage: prev.currentPage--,
                }));
              filters.currentPage > 1 && handleRefetch();
            }}
          >
            <PiCaretLeftBold className="text-xl" />
          </div>
          <div
            className={`bg-white px-1 py-1 rounded-lg  transition hover:cursor-pointer ${
              filters.currentPage === pageCount
                ? "hover:cursor-not-allowed text-gray-400"
                : "hover:bg-green-800 hover:text-white"
            }`}
            onClick={() => {
              filters.currentPage < pageCount &&
                setFilter((prev) => ({
                  ...prev,
                  currentPage: prev.currentPage++,
                }));
              filters.currentPage < pageCount && handleRefetch();
            }}
          >
            <PiCaretRightBold className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Attendance;
