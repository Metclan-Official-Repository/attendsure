//importing hooks
import { useState, useRef, useEffect } from "react";

//importing icons
import { FaEllipsisH } from "react-icons/fa";

const RowCard = ({ name, id, isAdmin }) => {
  const dropdownRef = useRef();
  const dropdownBg = useRef();
  const cardBg = useRef();
  const [showDropDown, setShowDropDown] = useState(false);
  useEffect(() => {
    const enableDropdown = () => setShowDropDown(true);
    const disableDropdown = () => setShowDropDown(false);
    const enableDropdownOnClick = (e) => {
      if (dropdownBg.current) {
        if (e.target === dropdownRef.current) {
          enableDropdown();
        }
        if (e.target !== dropdownBg.current) {
          disableDropdown();
        }
      }
    };
    if (dropdownRef.current) {
      dropdownRef.current.addEventListener("mouseover", enableDropdown);
    }
    if (dropdownBg.current) {
      dropdownBg.current.addEventListener("mouseleave", disableDropdown);
      cardBg.current.addEventListener("mouseleave", disableDropdown);
    }
    document.addEventListener("click", enableDropdownOnClick);
    return () => {
      if (dropdownRef.current) {
        dropdownRef.current.removeEventListener("mouseover", enableDropdown);
      }
      if (dropdownBg.current) {
        dropdownRef.current.removeEventListener("mouseleave", disableDropdown);
        cardBg.current.removeEventListener("mouseleave", disableDropdown);
      }
    };
  });
  return (
    <div>
      <div
        className="flex justify-between px-6 py-4 bg-white hover:shadow transition rounded-lg items-center mt-6"
        ref={cardBg}
      >
        <div>
          <p className="font-poppins text-gray-800">{name}</p>
        </div>
        <div className="flex items-center gap-8 relative">
          <div className="hidden md:block text-sm font-medium text-blue-500 hover:text-blue-700 hover:font-bold transition cursor-pointer">
            {!isAdmin && "Edit"}
          </div>
          {!isAdmin && (
            <div
              className="hover:bg-gray-100 px-3 py-2 rounded-lg transition cursor-pointer"
              ref={dropdownRef}
            >
              <FaEllipsisH />
            </div>
          )}
          {showDropDown && (
            <div
              ref={dropdownBg}
              className="absolute bg-white top-10 w-[200px] right-0 shadow rounded-lg py-2 px-1 border z-10"
            >
              <div className="text-sm font-medium px-4 py-3 cursor-pointer hover:bg-gray-200 transition">
                Delete
              </div>
              <div className="text-sm font-medium px-4 py-3 cursor-pointer hover:bg-gray-200 transition">
                Edit
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default RowCard;
