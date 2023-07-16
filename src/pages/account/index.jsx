import { useState } from "react";

const Account = () => {
  const [businessInfo, setBusinessInfo] = useState({
    businessName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [activeField, setActiveField] = useState(null);
  const handleFocus = (e) => setActiveField(e.target.name);
  const handleBlur = () => setActiveField(null);
  const handleChange = (e) =>
    setBusinessInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  return (
    <div>
      <div>
        <h2 className="font-poppins text-gray-700 md:text-lg">
          Account information
        </h2>
      </div>
      <form className="w-full mt-4">
        <div className="">
          {/* Business information */}
          <div className="w-full lg:w-1/2">
            <label className="text-sm font-medium text-gray-700">
              Business name
            </label>
            <input
              className="bg-white w-full px-3 rounded-[5px] py-[8px] outline-none text-sm border transition"
              name={"businessName"}
              onChange={handleChange}
              value={businessInfo.value}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{
                borderColor: activeField === "businessName" && "#21c55d",
              }}
            />
          </div>
          {/* Personal Information */}
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between w-full lg:w-1/2 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                className="bg-white w-full px-3 rounded-[5px] py-[8px] outline-none text-sm border transition"
                name={"firstName"}
                onChange={handleChange}
                value={businessInfo.firstName}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  borderColor: activeField === "firstName" && "#21c55d",
                }}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                className="bg-white w-full px-3 rounded-[5px] py-[8px] outline-none text-sm border transition"
                name={"lastName"}
                onChange={handleChange}
                value={businessInfo.lastName}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  borderColor: activeField === "lastName" && "#21c55d",
                }}
              />
            </div>
          </div>
          {/* Personal Information */}
          <div className="flex flex-col gap-2 w-full lg:w-1/2 mt-10">
            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input
                className="bg-white w-full px-3 rounded-[5px] py-[8px] outline-none text-sm border transition"
                name={"phone"}
                onChange={handleChange}
                value={businessInfo.phone}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  borderColor: activeField === "phone" && "#21c55d",
                }}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                className="bg-white w-full px-3 rounded-[5px] py-[8px] outline-none text-sm border transition"
                name={"email"}
                onChange={handleChange}
                value={businessInfo.email}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  borderColor: activeField === "email" && "#21c55d",
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full max-w-[600px] mt-8">
          <button
            type={"submit"}
            className="border py-2 px-6 bg-green-500 text-white rounded-lg transition hover:bg-green-600"
            style={
              {
                // cursor: mutateDepartments.isLoading ? "not-allowed" : "pointer",
              }
            }
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Account;
