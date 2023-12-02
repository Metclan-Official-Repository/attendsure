//importing hooks
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

//import media
import DefaultPic from "../../assets/default.png";

//importing functions
import { baseUrl } from "../../api";
import { checkRole } from "../../helper";
//import icons
import { IoLocationSharp } from "react-icons/io5";

const EmployeeCard = ({
  firstName,
  middleName,
  lastName,
  imageIsSet,
  city,
  jobTitle,
  imageUrl,
  deleteItem,
  id,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef();
  const updateImage = () => {
    if (imageRef.current.complete) {
      setImageLoaded(true);
    }
  };
  const handleDelete = () => {
    deleteItem({
      enabled: true,
      item: `${firstName} ${lastName}`,
      action: "DELETE_EMPLOYEE",
      id: id,
    });
  };
  useEffect(() => {
    imageRef.current.addEventListener("load", updateImage);
    return () =>
      imageRef.current &&
      imageRef.current.removeEventListener("load", updateImage);
  }, [imageLoaded]);
  return (
    <Link
      to={`/employees/${id}`}
      className="w-full bg-gray-100 border flex justify-center py-6 items-center rounded-lg px-4 transition hover:shadow cursor-pointer"
    >
      <div className="w-[80%] flex items-center flex-col">
        <div className="w-max mx-auto relative">
          <div className="rounded-full border-white border-2 w-20 h-20 md:h-28 md:w-28 md:min-h-28 md:min-w-28 overflow-hidden flex justify-center items-center mx-auto">
            <img
              src={
                imageLoaded
                  ? `${baseUrl()}public/files/images/${imageUrl}`
                  : DefaultPic
              }
              alt={"Profile"}
              className="w-[100%] h-[100%]"
              ref={imageRef}
            />
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
      </div>
    </Link>
  );
};
export default EmployeeCard;
