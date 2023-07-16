//importing hooks
import { useEffect, useState, useRef } from "react";

//importing icons
import { IoEllipsisVertical } from "react-icons/io5";

const DepartmentCard = ({ name, id, deleteItem }) => {
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptionRef = useRef();
  const handleDelete = () => {
    deleteItem({
      enabled: true,
      item: `${name}`,
      action: "DELETE_DEPARTMENT",
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
    <div className="w-full hover:shadow transition rounded-lg border relative hover:bg-gray-100 transition">
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
            href={`/departments/edit?departmentId=${id}`}
            className="text-sm font-medium text-blue-700  hover:underline"
          >
            Edit
          </a>
          <div
            onClick={handleDelete}
            className="text-sm font-medium text-blue-700 mt-2 hover:underline cursor-pointer"
          >
            Delete
          </div>
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
