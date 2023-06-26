//importing hooks
import { useEffect, useState, useRef } from "react";

//importing icons
import { IoEllipsisVertical } from "react-icons/io5";

const DepartmentCard = ({ name }) => {
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptionRef = useRef();
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
    <div className="w-full hover:shadow transition rounded-lg border relative">
      <div className="  px-3 py-4">
        <div className="flex items-center justify-between cursor-pointer">
          <h2 className="font-semibold text-gray-600">{name}</h2>
          <div
            onClick={() => setShowOptions((prev) => !prev)}
            ref={toggleOptionRef}
            className=""
          >
            <IoEllipsisVertical style={{ pointerEvents: "none" }} />
          </div>
        </div>
        <div className="mt-4">
          <a
            href="/employees"
            className="w-max py-2 text-sm font-medium rounded-full text-blue-600 hover:underline transition"
          >
            See employees
          </a>
        </div>
      </div>
      {showOptions && (
        <div className="bg-white absolute top-[50%] flex flex-col w-[70%] rounded-lg shadow border px-3 py-4 right-[5%] z-10">
          <a
            href=""
            className="text-sm font-medium text-blue-700  hover:underline"
          >
            Edit
          </a>
          <a
            href=""
            className="text-sm font-medium text-blue-700 mt-2 hover:underline"
          >
            Delete
          </a>
          <a
            href=""
            className="text-sm font-medium text-blue-700 mt-2 hover:underline"
          >
            Employees
          </a>
        </div>
      )}
    </div>
  );
};
export default DepartmentCard;
