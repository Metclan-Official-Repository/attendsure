//import libraries, hooks and functions
import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

//importing constant data
import { summaryTableColumns } from "../../constants";

//impoting components
import { SkeletonLoaderTable } from "../../components";
//import icons
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

//table configs
const columnHelper = createColumnHelper();
const defaultData = [
  {
    FirstName: "chibuike",
    LastName: "Harmony",
    ActiveDays: 56,
    CheckIn: 10,
    CheckOut: 67,
    TotalHours: 10,
    AbsentDays: 45,
    LateArrivals: 10,
    EarlyArrivals: 45,
    EarlyDepartures: 10,
    Department: "Cleaners",
  },
];
const Summary = () => {
  const [filter, setFilter] = useState({
    userId: 1,
  });
  const [activeField, setActiveField] = useState(null);
  const columns = summaryTableColumns.map((column) =>
    columnHelper.accessor(`${column.value}`, {
      cell: (info) => info.getValue(),
    })
  );
  const [data, setData] = useState([...defaultData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  //event handlers
  const handleBlur = () => {};
  const handleFocus = () => {};
  const handleSubmit = () => {};
  const handleChange = () => {};
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
                  name={"employementStatus"}
                  value={""}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    borderColor:
                      activeField === "employementStatus" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition bg-white"
                  disabled={false}
                  required
                >
                  <option>Nkechi Chiamaka</option>
                </select>
              </div>
              {/* Employee's Department */}
              <div className="flex flex-col gap-1 mt-2 flex-1">
                <div className="flex items-center">
                  <label className="text-sm">Department</label>
                </div>
                <select
                  name={"employementStatus"}
                  value={""}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    borderColor:
                      activeField === "employementStatus" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition bg-white"
                  disabled={false}
                  required
                >
                  <option>Nkechi Chiamaka</option>
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
                  name={"employementStatus"}
                  value={""}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    borderColor:
                      activeField === "employementStatus" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition bg-white"
                  disabled={false}
                  required
                >
                  <option>Nkechi Chiamaka</option>
                </select>
              </div>
              {/* Business Location */}
              <div className="flex flex-col gap-1 mt-2 flex-1">
                <div className="flex items-center">
                  <label className="text-sm">Business Location</label>
                </div>
                <select
                  name={"employementStatus"}
                  value={""}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    borderColor:
                      activeField === "employementStatus" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition bg-white"
                  disabled={false}
                  required
                >
                  <option>Nkechi Chiamaka</option>
                </select>
              </div>
            </div>
          </div>
          {/* Third row  */}
          <div className="flex flex-col gap-2 sm:flex-row mt-2">
            {/* Check in*/}
            <div className="flex flex-col gap-1 mt-2 flex-1">
              <div className="flex items-center">
                <label className="text-sm">Check in</label>
              </div>
              <select
                name={"employementStatus"}
                value={""}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  borderColor: activeField === "employementStatus" && "#21c55d",
                }}
                className="outline-none text-sm border py-2 px-2 rounded-sm transition bg-white"
                disabled={false}
                required
              >
                <option>Nkechi Chiamaka</option>
              </select>
            </div>
            {/* Checkout */}
            <div className="flex flex-col gap-1 mt-2 flex-1">
              <div className="flex items-center">
                <label className="text-sm">Check out</label>
              </div>
              <select
                name={"employementStatus"}
                value={""}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  borderColor: activeField === "employementStatus" && "#21c55d",
                }}
                className="outline-none text-sm border py-2 px-2 rounded-sm transition bg-white"
                disabled={false}
                required
              >
                <option>Nkechi Chiamaka</option>
              </select>
            </div>
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
                    className="text-left py-4 font-poppins font-normal text-sm border-b whitespace-nowrap"
                  >
                    <span className="whitespace-nowrap">
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
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b last:border-none">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-4 font-light text-xs font-poppins [&:nth-child(6)]:text-sm [&:nth-child(5)]:text-sm sm:text-xs"
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
        </table>
        {/* <SkeletonLoaderTable numberOfRows={8} /> */}
      </div>
      <div className="flex justify-start mt-6 gap-4">
        <div className="font-sm">
          <div className="">
            <div className="font-raleway text-sm font-medium">
              Page{" "}
              <div className="border border-black text-xs inline-block px-1 py-[2px] rounded-[5px]">
                20
              </div>{" "}
              of 5
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-1 py-1 rounded-lg hover:text-white hover:bg-green-800 transition hover:cursor-pointer">
            <PiCaretLeftBold className="text-xl" />
          </div>
          <div className="bg-white px-1 py-1 rounded-lg hover:text-white hover:bg-green-800 transition hover:cursor-pointer">
            <PiCaretRightBold className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Summary;
