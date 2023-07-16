//importing hooks
import { useEffect, useRef, useState } from "react";
//importing functions
import { NavLink } from "react-router-dom";
import { baseUrl } from "../../api";
//importing components
import { IoLocationSharp, IoCallOutline } from "react-icons/io5";
import { HiOutlineInformationCircle } from "react-icons/hi";

//importing media
import DisplayPic from "../../assets/default.png";

const AttendanceCard = ({
  firstName,
  lastName,
  middleName,
  mobile,
  imageIsset,
  jobTitle,
  city,
  id,
  isCheckedIn,
  sessionId,
  imageUrl,
}) => {
  const imageRef = useRef();
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const setComplete = () => {
      if (imageRef.current.complete && imageRef.current.complete) {
        setImageLoaded(true);
      }
    };
    imageRef.current.addEventListener("load", setComplete);
    return () =>
      imageRef.current &&
      imageRef.current.removeEventListener("load", setComplete);
  }, [imageLoaded]);
  return (
    <NavLink
      className="w-full bg-gray-100 border flex justify-center py-6 items-center rounded-lg px-4 transition hover:shadow cursor-pointer"
      to={
        isCheckedIn === 0
          ? `/check-in?userId=${id}`
          : `/check-out?userId=${id}&sessionId=${sessionId}`
      }
    >
      <div className="w-[80%] flex items-center flex-col">
        <div className="w-max mx-auto relative">
          <div className="rounded-full border-white border-2 w-20 h-20 md:h-28 md:w-28 md:min-h-28 md:min-w-28 overflow-hidden flex justify-center items-center mx-auto">
            <img
              src={
                imageLoaded
                  ? `${baseUrl()}public/files/images/${imageUrl}`
                  : DisplayPic
              }
              alt={"Profile"}
              className="w-[100%] h-[100%]"
              ref={imageRef}
            />
            <div className="absolute h-[22px] w-[22px] bg-white flex justify-center items-center rounded-full bottom-[10%] right-[2%]">
              <div
                className={`w-[18px] h-[18px] rounded-full`}
                style={{ backgroundColor: isCheckedIn === 0 ? "red" : "green" }}
              ></div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="font-medium text-gray-800 mt-4 text-sm text-center font-poppins">
            {`${firstName} ${middleName} ${lastName}`}
          </div>
          <div className="text-center mt-2 text-sm">{jobTitle}</div>
          <div className="flex items-center text-xs text-gray-800 justify-center mt-3 bg-white mx-auto w-max px-2 py-1 rounded-full gap-2">
            <IoLocationSharp />
            <div className="font-poppins text-xs bg">{city}</div>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={() => (window.location.href = `tel:${mobile}`)}
            className="p-3 bg-white rounded-full text-gray-600 hover:bg-gray-800 transition hover:text-white"
          >
            <IoCallOutline className="text-2xl" />
          </button>
          <button
            onClick={() => (window.location.href = `/`)}
            className="p-3 bg-white rounded-full text-gray-600 hover:bg-gray-800 transition hover:text-white text-gray-600"
          >
            <HiOutlineInformationCircle className="text-2xl  " />
          </button>
        </div>
      </div>
    </NavLink>
  );
};
export default AttendanceCard;
