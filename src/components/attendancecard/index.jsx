import DefaultPic from "../../assets/default.png";
import { IoLocationSharp, IoCallOutline } from "react-icons/io5";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { NavLink } from "react-router-dom";

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
          <div className="rounded-full border-white border-2 w-20 md:w-24 overflow-hidden flex justify-center items-center mx-auto">
            <img
              src={`https://server.attendee.metclan.com/public/files/images/${imageUrl}`}
              alt={"Profile"}
              className="w-full h-full "
              loading="lazy"
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
          <a
            href={`tel:${mobile}`}
            className="p-3 bg-white rounded-full text-gray-600 hover:bg-gray-800 transition hover:text-white"
          >
            <IoCallOutline className="text-2xl" />
          </a>
          <a
            href="/"
            className="p-3 bg-white rounded-full text-gray-600 hover:bg-gray-800 transition hover:text-white text-gray-600"
          >
            <HiOutlineInformationCircle className="text-2xl  " />
          </a>
        </div>
      </div>
    </NavLink>
  );
};
export default AttendanceCard;
