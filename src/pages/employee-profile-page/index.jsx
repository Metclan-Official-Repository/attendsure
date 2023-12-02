//import hooks
import { useState, useEffect, useRef, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//import constants
import { baseUrl } from "../../api";

//import media
import DefaultPic from "../../assets/onyiyechi.jpeg";

//import services
import { fetchEmployee, fetchOneEmployee } from "../../api/employees";

//import icons
import { IoMdArrowDropright } from "react-icons/io";
import { FaLayerGroup } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import { BsClockFill } from "react-icons/bs";

//import components
import {
  EmployeeReport,
  EmployeeDetails,
  EmployeeSecurity,
} from "../../components";

const EmployeeProfilePage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentTab, setCurrentTab] = useState("REPORTS");
  const location = useLocation();
  const employeeId = location.pathname.split("/")[2];
  const [employeeDetails, setEmployeeDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    department: "",
    mobile: "",
    employeeId: "",
    city: "",
    address: "",
    shift: "",
    isOnDuty: "",
    locationName: "",
    managerFirstName: "",
    managerLastName: "",
  });
  const employeeDataQuery = useQuery({
    queryKey: ["EMPLOYEEONE"],
    refetchOnWindowFocus: false,
    queryFn: () => fetchOneEmployee({ employeeId: employeeId }),

    onSuccess: (data) => {
      const {
        e_firstname,
        e_middlename,
        e_lastname,
        employeeId,
        city,
        job_title,
        email,
        mobile,
        is_checkedin,
        shift_name,
        department_name,
        address,
        location_name,
        m_firstname,
        m_lastname,
      } = data.data.data;
      setEmployeeDetails({
        firstName: e_firstname,
        middleName: e_middlename,
        lastName: e_lastname,
        city: city,
        jobTitle: job_title,
        employeeId: employeeId,
        mobile: mobile,
        email: email,
        shift: shift_name,
        isOnDuty: is_checkedin,
        department: department_name,
        address: address,
        locationName: location_name,
        managerFirstName: m_firstname,
        managerLastName: m_lastname,
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const updateImage = () => {
    if (imageRef.current.complete) {
      setImageLoaded(true);
    }
  };
  const imageRef = useRef(null);
  useEffect(() => {
    imageRef.current.addEventListener("load", updateImage);
    return () =>
      imageRef.current &&
      imageRef.current.removeEventListener("load", updateImage);
  }, []);
  return (
    <section className="mx-auto w-[95%] mb-28">
      {/* Route */}
      <div className="flex items-center gap-2 mt-4">
        <Link to="/" className="text-xm hover:text-black">
          Dashboard
        </Link>
        <IoMdArrowDropright />
        <Link to="/employees" className="text-xm hover:text-black">
          Employees
        </Link>
        <IoMdArrowDropright />
        <div>{`${employeeDetails.firstName} ${employeeDetails.middleName} ${employeeDetails.lastName}`}</div>
      </div>
      <div className="mt-6 md:flex items-center justify-between md:gap-6">
        <div className="">
          {/* User profile  */}
          <div className=" flex justify-center items-center">
            <div className="w-32 h-32 sm:w-48 sm:h-48">
              <img
                src={DefaultPic}
                alt={"Profile"}
                className="w-[100%] h-[100%] rounded-full"
                ref={imageRef}
              />
            </div>
          </div>
        </div>
        <div className="rounded-lg border shadow-lg mt-4 p-6 md:w-[700px] sm:p-8 md:p-10">
          <div className="">
            <h4 className="text-[18px] text-black font-medium sm:text-xl md:text-2xl transition">
              {`${employeeDetails.firstName} ${employeeDetails.middleName} ${employeeDetails.lastName}`}
            </h4>
            <p className="text-xs mt-2 md:text-sm">
              {employeeDetails.jobTitle}
            </p>
            <div className="flex items-center gap-1 mt-4 text-gray-800">
              <FaLayerGroup />
              <p>{employeeDetails.department}</p>
            </div>
          </div>
          <div className="flex mt-10 justify-between items-center sm:gap-8 transition">
            <div className="sm:flex sm:flex-1 justify-between transition">
              <Link
                to={`tel:${employeeDetails.mobile}`}
                className="flex items-center gap-1 bg-green-200 py-2 px-4 rounded-[5px] transition hover:text-black"
              >
                <FaPhone />
                <p className="">{employeeDetails.mobile}</p>
              </Link>
              <div className="flex items-center gap-1 mt-2 sm:mt-0 p-2">
                <MdLocationOn />
                <p>{employeeDetails.city}</p>
              </div>
            </div>
            <div className="sm:flex sm:flex-1 justify-between transition">
              <div className="flex items-center gap-1 p-2 transition">
                <div
                  className={`h-3 w-3 rounded-full ${
                    employeeDetails.isOnDuty ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <p>{employeeDetails.isOnDuty ? "On Duty" : "Off Duty"}</p>
              </div>
              <div className="flex items-center gap-1 p-2 transition">
                <BsClockFill />
                <p>{employeeDetails.shift}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div>
          <h4 className="font-medium text-[18px] text-black transition">
            Attendance Summary
          </h4>
          <span className="black text-xs bg-black text-white px-2 py-1 rounded-[5px]">
            This month
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-full md:w-[700px] gap-2 mt-6">
          <div className="hover:bg-green-100 border border-transparent hover:border-green-500 p-2 rounded-lg cursor-pointer transition">
            <p className="font-semibold">Total Days</p>
            <p className="text-xl font-medium text-black text-green-500">20</p>
          </div>
          <div className="hover:bg-red-100 border border-transparent hover:border-red-500 p-2 rounded-lg cursor-pointer transition">
            <p className="font-semibold">Late Arrivals</p>
            <p className="text-xl font-medium text-black text-red-500">30</p>
          </div>

          <div className="hover:bg-yellow-100 border border-transparent hover:border-yellow-500 p-2 rounded-lg cursor-pointer transition">
            <p className="font-semibold">Early Departures</p>
            <p className="text-xl font-medium text-yellow-500">20</p>
          </div>
          <div className="hover:bg-green-100 border border-transparent hover:border-green-500 p-2 rounded-lg cursor-pointer transition">
            <p className="font-semibold">Late Departures</p>
            <p className="text-xl font-medium text-black">20</p>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <div className="flex gap-16 text-[14px] md:text-[18px] font-medium border-b-2">
          <span
            className={`p-2 border-b-4 ${
              currentTab === "REPORTS"
                ? "border-green-500"
                : "border-transparent"
            } cursor-pointer hover:text-black transition`}
            onClick={() => setCurrentTab("REPORTS")}
          >
            Report
          </span>
          <span
            className={`p-2 border-b-4 ${
              currentTab === "DETAILS"
                ? "border-green-500"
                : "border-transparent"
            } cursor-pointer hover:text-black transition`}
            onClick={() => setCurrentTab("DETAILS")}
          >
            Details
          </span>
          <span
            className={`p-2 border-b-4 ${
              currentTab === "SECURITY"
                ? "border-green-500"
                : "border-transparent"
            } cursor-pointer hover:text-black transition`}
            onClick={() => setCurrentTab("SECURITY")}
          >
            Security
          </span>
        </div>
        <div>
          <Suspense fallback={<h1>Loading</h1>}>
            {currentTab === "REPORTS" && <EmployeeReport />}
            {currentTab === "DETAILS" && (
              <EmployeeDetails employeeDetails={employeeDetails} />
            )}
            {currentTab === "SECURITY" && <EmployeeSecurity />}
          </Suspense>
        </div>
      </div>
    </section>
  );
};
export default EmployeeProfilePage;
