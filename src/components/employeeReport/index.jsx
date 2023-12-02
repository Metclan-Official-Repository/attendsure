//import libraries, hooks and functions
import { useEffect, useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

//importing constant data
import { employeeAttendanceTable } from "../../constants/tables";

//import components
import { SkeletonLoaderTable } from "../../components";
import { DatePicker } from "rsuite";

//import services
import { reportSummary } from "../../api/reports/";

//import helper functions
import { addDays, isEqual, isAfter, isBefore } from "date-fns";
import {
  convertSecondsToDateString,
  convertSecondsToTimeString,
  isEarly,
} from "../../helper/timeConverters";
//import icons
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

//table configs
const columnHelper = createColumnHelper();

const EmployeeReport = () => {
  const [pageCount, setPageCount] = useState(0);
  const location = useLocation();
  const employeeId = location.pathname.split("/")[2];
  //report type
  const [reportType, setReportType] = useState("ATTENDANCE");

  //Filters are sent to the server for query operation
  const [filters, setFilter] = useState({
    currentPage: 1,
    employeeId: employeeId,
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const columns = employeeAttendanceTable.map((column) =>
    columnHelper.accessor(`${column.value}`, {
      cell: (info) => info.getValue(),
    })
  );
  const [data, setData] = useState([]);
  const queryClient = useQueryClient();
  const attendanceSummaryQuery = useQuery({
    queryKey: ["ATTENDANCE_REPORTS"],
    queryFn: () => reportSummary.fetch(filters),
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setPageCount(Math.ceil(data.data.count / 10));
    },
  });
  const fetchedData = useMemo(() => {
    if (attendanceSummaryQuery.isSuccess) {
      return attendanceSummaryQuery.data.data.data;
    } else {
      return [];
    }
  }, [attendanceSummaryQuery]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  //event handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    setFilter((prev) => ({ ...prev, currentPage: 1 }));
    handleRefetch();
  };
  const handleRefetch = async () => {
    await queryClient.invalidateQueries(["ATTENDANCE_REPORTS"]);
    await attendanceSummaryQuery.refetch();
  };
  const handleSetReport = (reportType) => {
    setReportType(reportType);
  };
  const formatTimeDisplay = (columnName, reportType) => {
    if (columnName === "CheckInTime" && reportType === "LATE_ARRIVALS") {
      return "bg-red-200 text-red-700";
    }
    if (columnName === "CheckOutTime" && reportType === "EARLY_DEPARTURES") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (columnName === "CheckOutTime" && reportType === "LATE_DEPARTURES") {
      return "bg-purple-200 text-purple-700";
    }
  };
  useEffect(() => {
    //attendace
    if (attendanceSummaryQuery.isSuccess) {
      const reportData = attendanceSummaryQuery.data.data.data;
      if (reportType === "ATTENDANCE") {
        const formattedData = reportData.map(
          ({ check_in, check_out, check_in_method }) => ({
            CheckInDate: convertSecondsToDateString(check_in),
            CheckInTime: convertSecondsToTimeString(check_in),
            CheckOutDate: convertSecondsToDateString(check_out),
            CheckOutTime: convertSecondsToTimeString(check_out),
            CheckInMethod: check_in_method,
          })
        );
        setData(formattedData);
      }
      if (reportType === "LATE_ARRIVALS") {
        const filteredData = reportData.filter(({ check_in }) => {
          const userCheckinDateTime = new Date(check_in * 1000);
          const preDefinedDate = new Date(check_in * 1000);
          const preDefinedTime = "7:00:00";
          const [hours, minutes, seconds] = preDefinedTime.split(":");
          preDefinedDate.setHours(hours, minutes, seconds);
          return isAfter(userCheckinDateTime, preDefinedDate);
        });
        const formattedData = filteredData.map(
          ({ check_in, check_out, check_in_method }) => {
            return {
              CheckInDate: convertSecondsToDateString(check_in),
              CheckInTime: convertSecondsToTimeString(check_in),
              CheckOutDate: convertSecondsToDateString(check_out),
              CheckOutTime: convertSecondsToTimeString(check_out),
              CheckInMethod: check_in_method,
            };
          }
        );
        setData(formattedData);
      }
      if (reportType === "EARLY_DEPARTURES") {
        const filteredData = reportData.filter(({ check_out }) => {
          const userCheckinDateTime = new Date(check_out * 1000);
          const preDefinedDate = new Date(check_out * 1000);
          const preDefinedTime = "21:00:00";
          const [hours, minutes, seconds] = preDefinedTime.split(":");
          preDefinedDate.setHours(hours, minutes, seconds);
          return isBefore(userCheckinDateTime, preDefinedDate);
        });
        const formattedData = filteredData.map(
          ({ check_in, check_out, check_in_method }) => {
            return {
              CheckInDate: convertSecondsToDateString(check_in),
              CheckInTime: convertSecondsToTimeString(check_in),
              CheckOutDate: convertSecondsToDateString(check_out),
              CheckOutTime: convertSecondsToTimeString(check_out),
              CheckInMethod: check_in_method,
            };
          }
        );
        setData(formattedData);
      }
      if (reportType === "LATE_DEPARTURES") {
        const filteredData = reportData.filter(({ check_out }) => {
          const userCheckinDateTime = new Date(check_out * 1000);
          const preDefinedDate = new Date(check_out * 1000);
          const preDefinedTime = "21:10:00";
          const [hours, minutes, seconds] = preDefinedTime.split(":");
          preDefinedDate.setHours(hours, minutes, seconds);
          return isAfter(userCheckinDateTime, preDefinedDate);
        });
        const formattedData = filteredData.map(
          ({ check_in, check_out, check_in_method }) => {
            return {
              CheckInDate: convertSecondsToDateString(check_in),
              CheckInTime: convertSecondsToTimeString(check_in),
              CheckOutDate: convertSecondsToDateString(check_out),
              CheckOutTime: convertSecondsToTimeString(check_out),
              CheckInMethod: check_in_method,
            };
          }
        );
        setData(formattedData);
      }
    }
  }, [reportType, fetchedData]);
  return (
    <div>
      <div className="mt-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div
            onClick={() => handleSetReport("ATTENDANCE")}
            className={`text-black px-4 py-2 rounded-[5px] text-xs bg-gray-200 transition cursor-pointer ${
              reportType === "ATTENDANCE"
                ? "bg-green-500 text-white"
                : "text-black"
            }`}
          >
            Attendance
          </div>
          <div
            onClick={() => handleSetReport("LATE_ARRIVALS")}
            className={`text-black px-4 py-2 rounded-[5px] text-xs bg-gray-200 transition cursor-pointer ${
              reportType === "LATE_ARRIVALS"
                ? "bg-red-500 text-white"
                : "text-black"
            }`}
          >
            Late Arrivals
          </div>
          <div
            onClick={() => handleSetReport("EARLY_DEPARTURES")}
            className={`text-black px-4 py-2 rounded-[5px] text-xs bg-gray-200 transition cursor-pointer ${
              reportType === "EARLY_DEPARTURES"
                ? "bg-yellow-500 text-white"
                : "text-black"
            }`}
          >
            Early Departures
          </div>
          <div
            onClick={() => handleSetReport("LATE_DEPARTURES")}
            className={`text-black px-4 py-2 rounded-[5px] text-xs bg-gray-200 transition cursor-pointer ${
              reportType === "LATE_DEPARTURES"
                ? "bg-purple-500 text-white"
                : "text-black"
            }`}
          >
            Late Departures
          </div>
        </div>
        <form className="" onSubmit={handleSubmit}>
          {/* Third row  */}
          <div className="flex flex-col gap-2 sm:flex-row mt-2 md:w-1/2">
            {/* From*/}
            <div className="flex flex-col gap-1 mt-2 flex-1">
              <div className="flex items-center">
                <label className="text-sm">From</label>
              </div>
              <DatePicker
                format="yyyy-MM-dd HH:mm:ss"
                value={filters.from}
                onChange={(date) =>
                  setFilter((prev) => ({ ...prev, from: date }))
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
                value={filters.to}
                onChange={(date) =>
                  setFilter((prev) => ({ ...prev, to: date }))
                }
              />
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <button
              type={"submit"}
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
      <div className="bg-white px-4 py-4 rounded-2xl w-full overflow-x-scroll">
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
                        <span
                          className={`px-2 py-1 rounded-lg whitespace-nowrap text-[13px] ${formatTimeDisplay(
                            cell.column.columnDef.accessorKey,
                            reportType
                          )}`}
                        >
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
        {data.length === 0 && (
          <p className="text-xl text-center mt-4">No Result found</p>
        )}
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
export default EmployeeReport;
