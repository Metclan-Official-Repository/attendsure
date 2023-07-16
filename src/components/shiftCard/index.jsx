//importing hooks
import { useState, useEffect, useRef } from "react";

//importing icons
import { IoEllipsisVertical } from "react-icons/io5";
import { LuClock7, LuClock } from "react-icons/lu";

const Shiftcard = ({ name, startTime, endTime, id, deleteItem }) => {
  const setTime = (time) => {
    try {
      return String(time).slice(0, 5);
    } catch (err) {
      return "--";
    }
  };
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptionRef = useRef();

  const handleDelete = () => {
    deleteItem({
      enabled: true,
      item: `${name}`,
      action: "DELETE_SHIFT",
      id: id,
    });
  };
  useEffect(() => {
    const toggleOptions = (e) => {
      if (e.target !== toggleOptionRef.current) {
        setShowOptions(false);
      }
    };
    document.addEventListener("click", toggleOptions);
    return () => document.removeEventListener("click", toggleOptions);
  }, []);
  return (
    <div className="w-full hover:shadow transition rounded-lg border relative hover:bg-gray-100">
      <div className="  px-3 py-4">
        <div className="flex items-center justify-between cursor-pointer">
          <h2 className="font-semibold text-gray-600">{name}</h2>
          <div
            onClick={() => setShowOptions((prev) => !prev)}
            ref={toggleOptionRef}
            className="p-2 hover:bg-gray-200 rounded-full transition"
          >
            <IoEllipsisVertical style={{ pointerEvents: "none" }} />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-1">
            <div className="font-medium text-gray-700">Start time</div>
            <LuClock7 />
          </div>
          <div className="flex items-center gap-1">
            <div className="font-medium text-gray-700">End time</div>
            <LuClock />
          </div>
        </div>
        <div className="flex justify-between mt-1">
          <div className="flex items-center">
            <div className="font-poppins">{setTime(startTime)}</div>
          </div>
          <div className="flex items-center">
            <div className="font-poppins">{setTime(endTime)}</div>
          </div>
        </div>
      </div>
      {showOptions && (
        <div className="bg-white absolute top-[50%] flex flex-col w-[70%] rounded-lg shadow border px-3 py-4 right-[5%] z-10">
          <a
            href={`/shifts/edit?shiftId=${id}`}
            className="text-sm font-medium text-blue-700  hover:underline"
          >
            Edit
          </a>
          <div
            href=""
            onClick={handleDelete}
            className="text-sm font-medium text-blue-700 mt-2 hover:underline cursor-pointer"
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
};
export default Shiftcard;
