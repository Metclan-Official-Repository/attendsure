//import hooks
import { Link } from "react-router-dom";

//import icons
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaArrowRightToCity } from "react-icons/fa6";
import { FaLayerGroup } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { MdMan } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";

const EmployeeDetails = ({ employeeDetails }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-2">
      {/* Contact information */}

      <div className="flex-1">
        <div className="flex items-center mt-8 gap-2">
          <div className="text-black font-medium text-[18px] whitespace-nowrap">
            Contact Information
          </div>
          <div className="w-full h-[1.5px] bg-gray-200"></div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1 flex-1">
            <FaPhoneSquareAlt className="" />
            <h4 className="text">Phone</h4>
          </div>
          <Link
            to={`tel:${employeeDetails.mobile}`}
            className="text-blue-600 flex-1"
          >
            {employeeDetails.mobile}
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 flex-1">
            <MdEmail />
            <h4>Email</h4>
          </div>
          <Link
            to={`mailto:${employeeDetails.email}`}
            className="flex-1 hover:no-underline text-blue-600"
          >
            {employeeDetails.email}
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 flex-1">
            <FaAddressBook />
            <h4>Address</h4>
          </div>
          <h6 className="flex-1 text-black">{employeeDetails.address}</h6>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 flex-1">
            <FaArrowRightToCity />
            <h4>City</h4>
          </div>
          <h6 className="flex-1 text-black">{employeeDetails.city}</h6>
        </div>
      </div>
      {/* Work information */}

      <div className="flex-1">
        <div className="flex items-center mt-8 gap-2">
          <div className="text-black font-medium text-[18px] whitespace-nowrap">
            Work
          </div>
          <div className="w-full h-[1.5px] bg-gray-200"></div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1 flex-1">
            <FaLayerGroup className="" />
            <h4 className="text">Department</h4>
          </div>
          <h6 className="text-black flex-1">{employeeDetails.department}</h6>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 flex-1">
            <FaUserGraduate />
            <h4>Work Title</h4>
          </div>
          <h6 className="text-black flex-1">{employeeDetails.jobTitle}</h6>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 flex-1">
            <MdMan className="text-xl" />
            <h4>Manager</h4>
          </div>
          <h6 className="flex-1 text-black">{`${employeeDetails.managerFirstName} ${employeeDetails.managerLastName}`}</h6>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 flex-1">
            <FaLocationArrow className="" />
            <h4>Work Location</h4>
          </div>
          <h6 className="flex-1 text-black">{employeeDetails.locationName}</h6>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
