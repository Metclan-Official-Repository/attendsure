//importing hooks
import { useState } from "react";

//importing icons
import { BiArrowBack } from "react-icons/bi";
//importing images
import DefaultPic from "../../../assets/default.png";
const EditEmployee = () => {
  const [profilePicutureIsSet, setProfilePicutureIsSet] = useState(true);
  const [employeeInfo, setEmployeeInfo] = useState({
    name: "",
    lastNames: "",
    username: "",
    mobile: "",
    email: "",
    title: "",
    department: "",
    pin: "",
    confirmPin: "",
  });
  const [activeField, setActiveField] = useState(null);

  //functions
  const handleChange = (e) =>
    setEmployeeInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleFocus = (e) => setActiveField(e.target.name);
  const handleBlur = () => setActiveField(null);
  const setPin = (e) => {
    console.log("we made it");
    // const value = e.target.value;
    // // Check if the value is a number
    // if (typeof value !== "number" && typeof value !== "string") {
    //   return false;
    // }
    // // Convert the value to a string representation
    // const strValue = String(value);
    // // Check if the string representation contains a decimal point
    // if (strValue.includes(".")) {
    //   return false;
    // }

    // // Check if the number is an integer
    // if (Number.isInteger(Number(value))) {
    //   if (e.target.name === "pin") {
    //     setEmployeeInfo((prev) => ({
    //       ...prev,
    //       [e.target.name]: e.target.value,
    //     }));
    //   }
    //   if (e.target.name === "confirmPin") {
    //     setEmployeeInfo((prev) => ({
    //       ...prev,
    //       [e.target.name]: e.target.value,
    //     }));
    //   }
    // }
  };
  return (
    <div className="mx-auto w-[95%] mb-28">
      <div className="flex items-center gap-4 mt-8">
        <a
          href="/employees"
          className="w-10 h-10 md:w-12 md:h-12 border flex items-center justify-center cursor-pointer hover:bg-gray-100 transition text-gray-500"
        >
          <BiArrowBack className="text-xl md:text-3xl" />
        </a>
        <div>
          <div className="text-xs md:text-sm">Back to employee list</div>
          <h4 className="text-gray-800 font-semibold text-sm md:text-xl">
            Add New Employee
          </h4>
        </div>
      </div>
      <form className="mt-6">
        <div className="sm:flex justify-between gap-6">
          {/* personal details  */}
          <div className="w-full max-w-[600px]">
            <h3 className="text-xl text-gray-800 mt-4">Personal details</h3>
            <div className="border py-6 px-3 rounded-lg mt-2 shadow">
              <div className="flex flex-col gap-1">
                <label className="text-sm">First Name</label>
                <input
                  name={"name"}
                  type={"text"}
                  value={employeeInfo.name}
                  placeholder="Your first name"
                  onChange={(e) => handleChange(e)}
                  onFocus={(e) => handleFocus(e)}
                  onBlur={(e) => handleBlur(e)}
                  style={{
                    borderColor: activeField === "name" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                  required
                />
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <label className="text-sm">Last names</label>
                <input
                  name={"lastNames"}
                  type={"text"}
                  value={employeeInfo.lastNames}
                  placeholder="Your last names"
                  onChange={(e) => handleChange(e)}
                  onFocus={(e) => handleFocus(e)}
                  onBlur={(e) => handleBlur(e)}
                  style={{
                    borderColor: activeField === "lastNames" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                />
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <label className="text-sm">Username</label>
                <input
                  name={"username"}
                  type={"text"}
                  value={employeeInfo.username}
                  placeholder="Your username"
                  onChange={(e) => handleChange(e)}
                  onFocus={(e) => handleFocus(e)}
                  onBlur={(e) => handleBlur(e)}
                  style={{
                    borderColor: activeField === "username" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                />
              </div>
            </div>
          </div>
          {/* Security details */}
          <div className="w-full max-w-[600px]">
            <h3 className="text-xl text-gray-800 mt-4">Security</h3>
            <div className="border py-6 px-3 rounded-lg mt-2 shadow">
              <div className="flex flex-col gap-1 mt-2">
                <label className="text-sm">Check in pin</label>
                <input
                  name={"pin"}
                  type={"password"}
                  value={employeeInfo.pin}
                  placeholder="Enter 4 digits pin"
                  onChange={(e) => setPin}
                  onFocus={(e) => handleFocus(e)}
                  onBlur={(e) => handleBlur(e)}
                  style={{
                    borderColor: activeField === "pin" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                />
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <label className="text-sm">Confirm pin</label>
                <input
                  name={"confirmPin"}
                  type={"password"}
                  value={employeeInfo.confirmPin}
                  placeholder="Confirm pin"
                  onChange={(e) => setPin(e)}
                  onFocus={(e) => handleFocus(e)}
                  onBlur={(e) => handleBlur(e)}
                  style={{
                    borderColor: activeField === "confirmPin" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="sm:flex justify-between gap-6">
          {/* Contact details  */}
          <div className="w-full max-w-[600px]">
            <h3 className="text-xl text-gray-800 mt-4">Contact information</h3>
            <div className="border py-6 px-3 rounded-lg mt-2 shadow">
              <div className="flex flex-col gap-1 mt-2">
                <label className="text-sm">Mobile</label>
                <input
                  name={"mobile"}
                  type={"tel"}
                  value={employeeInfo.mobile}
                  placeholder="mobile number"
                  onChange={(e) => handleChange(e)}
                  onFocus={(e) => handleFocus(e)}
                  onBlur={(e) => handleBlur(e)}
                  style={{
                    borderColor: activeField === "mobile" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                  required
                />
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <label className="text-sm">Email</label>
                <input
                  name={"email"}
                  type={"email"}
                  value={employeeInfo.email}
                  placeholder="Your email address"
                  onChange={(e) => handleChange(e)}
                  onFocus={(e) => handleFocus(e)}
                  onBlur={(e) => handleBlur(e)}
                  style={{
                    borderColor: activeField === "email" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                />
              </div>
            </div>
          </div>
          {/* Employee image  */}
          <div className="w-full max-w-[600px]">
            <h3 className="text-xl text-gray-800 mt-4">Employee Image</h3>
            <div className="border py-6 px-3 rounded-lg mt-2 flex justify-between gap-4 shadow">
              <label
                htmlFor="image"
                className="w-1/2 h-32 border-2 bg-gray-100 border-dashed border-blue-300 rounded-lg text-blue-700 underline flex items-center justify-center cursor-pointer hover:bg-gray-200 transition"
              >
                Click to upload
                <input
                  name={"image"}
                  type="file"
                  id="image"
                  accept=".jpg, .jpeg, .png"
                  className="hidden"
                />
              </label>
              <div className="w-1/2 flex items-center justify-center border rounded-lg relative h-32">
                <img src={DefaultPic} alt="Profile" className="w-24" />
                {profilePicutureIsSet && (
                  <div className="w-full h-full absolute top-0 left-0 bg-gray-500 opacity-90 rounded-lg flex items-center flex-col justify-center gap-4">
                    <p className="bg-white px-2 py-1 rounded-lg text-sm hover:bg-gray-100 cursor-pointer font-semibold">
                      Replace
                    </p>
                    <p className="bg-white px-2 py-1 rounded-lg text-sm hover:bg-gray-100 cursor-pointer font-semibold">
                      Remove
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Job details  */}
        <div className="max-w-[600px]">
          <h3 className="text-xl text-gray-800 mt-4">Job Details</h3>
          <div className="border py-6 px-3 rounded-lg mt-2 shadow">
            <div className="flex flex-col gap-1 mt-2">
              <label className="text-sm">Job title</label>
              <input
                name={"title"}
                type={"text"}
                value={employeeInfo.title}
                placeholder="What's your job title"
                onChange={(e) => handleChange(e)}
                onFocus={(e) => handleFocus(e)}
                onBlur={(e) => handleBlur(e)}
                style={{
                  borderColor: activeField === "title" && "#21c55d",
                }}
                className="outline-none text-sm border py-2 px-2 rounded-sm transition"
              />
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <label className="text-sm">Choose department</label>
              <select
                name={"department"}
                value={employeeInfo.department}
                onChange={(e) => handleChange(e)}
                onFocus={(e) => handleFocus(e)}
                onBlur={(e) => handleBlur(e)}
                style={{
                  borderColor: activeField === "department" && "#21c55d",
                }}
                className="outline-none text-sm border py-2 px-2 rounded-sm transition bg-white"
              >
                <option>Manager</option>
                <option>Cleaner</option>
                <option>Sales Representative</option>
                <option>Security</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full max-w-[600px] mt-8">
          <button className="border py-2 px-4 rounded-lg hover:bg-gray-100 transition">
            Discard
          </button>
          <button
            type={"submit"}
            className="border py-2 px-6 bg-green-500 text-white rounded-lg transition hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditEmployee;
