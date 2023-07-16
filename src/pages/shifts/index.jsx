//importing hooks
import { useQuery } from "@tanstack/react-query";

//importing components
import { ShiftCard } from "../../components";
import { FadeLoader } from "react-spinners";

//importin icons
import { BiPlusCircle } from "react-icons/bi";

//importing services
import { fetchShift } from "../../api/shift";

const Shifts = ({ deleteItem }) => {
  const shiftQuery = useQuery({
    queryKey: ["SHIFTS"],
    queryFn: () => fetchShift(),
  });
  return (
    <div className="w-[95%] mx-auto">
      <div className="flex items-center justify-between">
        <div className="mt-4">
          <div className="w-16 h-1 bg-purple-400"></div>
          <h4 className="text-xl font-medium text-gray-600">Shift</h4>
        </div>
        <div className="mt-4">
          <a
            href="/shifts/new"
            className="flex items-center gap-2 text-center bg-green-500 px-6 py-2 text-white text-sm rounded-lg hover:bg-green-600 transition"
          >
            <BiPlusCircle />
            <p>Add New</p>
          </a>
        </div>
      </div>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-2 gap-y-2 mt-4">
        {shiftQuery.data &&
          shiftQuery.data.data.data.map(
            ({ name, id, start_time, end_time }) => (
              <ShiftCard
                name={name}
                key={id}
                id={id}
                startTime={start_time}
                endTime={end_time}
                deleteItem={deleteItem}
              />
            )
          )}
      </div>
      <div className="w-full flex justify-center mt-8">
        <FadeLoader
          color="#199432"
          height={10}
          width={4}
          margin={-6}
          loading={shiftQuery.isLoading}
        />
      </div>
    </div>
  );
};
export default Shifts;
