//importing hooks
import { useState, useRef, useEffect } from "react";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";

//importing components
import { toast } from "react-toastify";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { FadeLoader } from "react-spinners";

//importing icons
import { BiArrowBack } from "react-icons/bi";
import { CgAsterisk } from "react-icons/cg";

//importing services
import { fetchDepartments } from "../../../api/departments/";
import { fetchShift } from "../../../api/shift/";
import { fetchLocations } from "../../../api/locations/";
import { fetchEmployee, editEmployee } from "../../../api/employees";
import { fetchEmployeeLocation } from "../../../api/employee_locations";

//importing functions
import { baseUrl } from "../../../api";

//importing constants
import { employementStatuses } from "../../../constants";

const EditEmployee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [loadedEmployeeData, setLoadedEmployeeData] = useState(false);
  const search = new URLSearchParams(location.search);
  const id = search.get("employeeId");
  const uploadedImageRef = useRef();
  const imagePreviewRef = useRef();
  const employeeInfoForm = useRef();
  const animatedComponents = makeAnimated();
  const reader = new FileReader();
  const [profilePicutureIsSet, setProfilePicutureIsSet] = useState(false);
  const [employeeInfo, setEmployeeInfo] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    jobTitle: "",
    employementStatus: "fulltime",
    shift: "",
    departmentId: "1",
    pin: "0000",
    confirmPin: "",
    image: "",
    locations: [],
    validatePin: function () {
      if (this.pin.length < 4) {
        toast.error("Pin code must be 4 digits");
        return false;
      }
      if (this.pin === this.confirmPin) {
        return true;
      }
      toast.error("Pin codes do not match");
      return false;
    },
  });
  const [activeField, setActiveField] = useState(null);

  //functions
  const handleChange = (e) =>
    setEmployeeInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleFocus = (e) => setActiveField(e.target.name);
  const handleBlur = () => setActiveField(null);
  const handleSelect = (selectedOption) => {
    setEmployeeInfo((prev) => ({
      ...prev,
      locations: selectedOption,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (employeeInfo.validatePin()) {
      employeeMutation.mutate();
    }
  };
  const removeImage = () => {
    setEmployeeInfo((prev) => ({ ...prev, image: "" }));
  };
  const setPin = (e) => {
    const value = e.target.value;
    // Check if the value is a number
    if (typeof value !== "number" && typeof value !== "string") {
      return;
    }
    // Convert the value to a string representation
    const strValue = String(value);

    // Check if the string representation contains a decimal point
    if (strValue.includes(".")) {
      return;
    }
    // Check if the number is an integer
    if (Number.isInteger(Number(value))) {
      //check if name is pin
      if (e.target.name === "pin" && employeeInfo.pin.length < 4) {
        setEmployeeInfo((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      }
      if (
        e.target.name === "confirmPin" &&
        employeeInfo.confirmPin.length < 4
      ) {
        setEmployeeInfo((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      }
    }
  };
  const resetPin = () => {
    setEmployeeInfo((prev) => ({ ...prev, pin: "", confirmPin: "" }));
  };
  //employees mutation
  const employeeMutation = useMutation({
    mutationFn: () => {
      const formData = new FormData(employeeInfoForm.current);

      //additional information needed in the database
      formData.append("imageIsSet", profilePicutureIsSet);
      formData.append("id", employeeInfo.id);
      formData.append("isCheckedIn", employeeInfo.isCheckedIn);
      formData.append("sessionId", employeeInfo.sessionId);
      formData.append("isActive", employeeInfo.isActive);
      formData.append("imageUrl", employeeInfo.imageUrl);
      return editEmployee(formData);
    },
    onSuccess: () => {
      toast.success("Employee updated");
      queryClient.invalidateQueries("/employees");
      navigate("/employees");
    },
    onError: () => {
      toast.error("An error occurred");
    },
  });

  //fetch queries
  const fetchQueries = useQueries({
    queries: [
      {
        queryKey: ["SHIFTS"],
        queryFn: () => fetchShift(),
      },
      {
        queryKey: ["DEPARTMENTS"],
        queryFn: () => fetchDepartments(),
      },
      {
        queryKey: ["LOCATIONS"],
        queryFn: () => fetchLocations(),
        onSuccess: (data) => {},
      },
      {
        queryKey: ["EMPLOYEE_LOCATION"],
        queryFn: () =>
          fetchEmployeeLocation({
            employeeId: id,
          }),
        onSuccess: (data) => {
          //map through the fetched data and change the keys name
          const fetchedLocations = data.data.data.map(
            ({ name, location_unique_name, id }) => ({
              value: id,
              label: `${name}(${location_unique_name})`,
            })
          );
          setEmployeeInfo((prev) => ({ ...prev, locations: fetchedLocations }));
        },
      },
      {
        queryKey: ["EMPLOYEE"],
        queryFn: () =>
          fetchEmployee({
            id: id,
          }),
        onSuccess: (data) => {
          const {
            id,
            first_name,
            last_name,
            middle_name,
            mobile,
            email,
            address,
            city,
            department_id,
            employment_status,
            shift_id,
            job_title,
            pin,
            image_url,
            is_checkedin,
            session_id,
            is_active,
          } = data.data.data[0];
          setEmployeeInfo((prev) => ({
            ...prev,
            id: id,
            firstName: first_name,
            lastName: last_name,
            middleName: middle_name,
            mobile: mobile,
            email: email,
            address: address,
            city: city,
            departmentId: department_id,
            employementStatus: employment_status,
            jobTitle: job_title,
            pin: pin,
            shift: shift_id,
            confirmPin: pin,
            isCheckedIn: is_checkedin,
            sessionId: session_id,
            isActive: is_active,
            imageUrl: image_url,
          }));
          imagePreviewRef.current.src = `${baseUrl()}public/files/images/${image_url}`;
          setProfilePicutureIsSet(true);
        },
      },
    ],
  });
  useEffect(() => {
    //check the length of the img tag is > 0
    if (uploadedImageRef.current.files.length) {
      setProfilePicutureIsSet(true);
      const file = uploadedImageRef.current.files[0];
      reader.onload = (e) => {
        imagePreviewRef.current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    //  else {
    //   imagePreviewRef.current.src = DefaultPic;
    //   setProfilePicutureIsSet(false);
    // }
  }, [employeeInfo]);

  //effect to know if user data has been fetched
  useEffect(() => {
    if (fetchQueries.every((query) => query.isSuccess === true)) {
      setLoadedEmployeeData(true);
    }
  }, [fetchQueries]);
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
          <div className="text-xs md:text-sm">Back to employees list</div>
          <h4 className="text-gray-800 font-semibold text-sm md:text-xl">
            Edit Employee
          </h4>
        </div>
      </div>
      <form
        className="mt-6"
        onSubmit={handleSubmit}
        ref={employeeInfoForm}
        style={{ display: loadedEmployeeData ? "block" : "none" }}
      >
        <div className="sm:flex justify-between gap-6">
          {/* personal details  */}
          <div className="w-full max-w-[600px]">
            <h3 className="text-xl text-gray-800 mt-4">Personal details</h3>
            <div className="border py-6 px-3 rounded-lg mt-2 shadow">
              <div className="flex flex-col gap-1">
                <div className="flex items-center">
                  <label className="text-sm">First Name</label>
                  <span className="text-red-600 text-sm">
                    <CgAsterisk />
                  </span>
                </div>
                <input
                  name={"firstName"}
                  type={"text"}
                  value={employeeInfo.firstName}
                  placeholder="Your first name"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    borderColor: activeField === "firstName" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                  disabled={employeeMutation.isLoading}
                  required
                />
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <div className="flex items-center">
                  <label className="text-sm">Last Name</label>
                  <span className="text-red-600 text-sm">
                    <CgAsterisk />
                  </span>
                </div>
                <input
                  name={"lastName"}
                  type={"text"}
                  value={employeeInfo.lastName}
                  placeholder="Your last name"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    borderColor: activeField === "lastName" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                  disabled={employeeMutation.isLoading}
                  required
                />
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <label className="text-sm">Middle name</label>
                <input
                  name={"middleName"}
                  type={"text"}
                  value={employeeInfo.middleName}
                  placeholder="Your middle name"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    borderColor: activeField === "middleName" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                  disabled={employeeMutation.isLoading}
                />
              </div>
            </div>
          </div>
          {/* Security details */}
          <div className="w-full max-w-[600px]">
            <h3 className="text-xl text-gray-800 mt-4">Security</h3>
            <div className="border py-6 px-3 rounded-lg mt-2 shadow">
              <div className="flex flex-col gap-1 mt-2">
                <div className="flex items-center">
                  <label className="text-sm">Check in</label>
                  <span className="text-red-600 text-sm">
                    <CgAsterisk />
                  </span>
                </div>
                <input
                  name={"pin"}
                  type={"password"}
                  value={employeeInfo.pin}
                  placeholder="Enter 4 digits pin"
                  onChange={(e) => setPin(e)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    borderColor: activeField === "pin" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                  disabled={employeeMutation.isLoading}
                  required
                />
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <label className="text-sm">Confirm pin</label>
                <input
                  name={"confirmPin"}
                  type={"password"}
                  value={employeeInfo.confirmPin}
                  placeholder="Confirm pin"
                  onChange={setPin}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    borderColor: activeField === "confirmPin" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                  disabled={employeeMutation.isLoading}
                />
              </div>
              <button
                type="button"
                className="bg-green-500 text-white px-2 py-1 text-sm mt-3 hover:bg-green-600 rounded-[3px]"
                onClick={() => resetPin()}
                disabled={employeeMutation.isLoading}
              >
                Reset pin
              </button>
            </div>
          </div>
        </div>
        <div className="sm:flex justify-between gap-6">
          {/* Contact details  */}
          <div className="w-full max-w-[600px]">
            <h3 className="text-xl text-gray-800 mt-4">Contact information</h3>
            <div className="border py-6 px-3 rounded-lg mt-2 shadow">
              <div className="flex flex-col gap-1 mt-2">
                <div className="flex items-center">
                  <label className="text-sm">Mobile</label>
                  <span className="text-red-600 text-sm">
                    <CgAsterisk />
                  </span>
                </div>
                <input
                  name={"mobile"}
                  type={"tel"}
                  value={employeeInfo.mobile}
                  placeholder="mobile number"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    borderColor: activeField === "mobile" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                  disabled={employeeMutation.isLoading}
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
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    borderColor: activeField === "email" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                  disabled={employeeMutation.isLoading}
                />
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <label className="text-sm">Address</label>
                <input
                  name={"address"}
                  type={"text"}
                  value={employeeInfo.address}
                  placeholder="Your address"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    borderColor: activeField === "address" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                  disabled={employeeMutation.isLoading}
                />
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <div className="flex items-center">
                  <label className="text-sm">City</label>
                  <span className="text-red-600 text-sm">
                    <CgAsterisk />
                  </span>
                </div>
                <input
                  name={"city"}
                  type={"text"}
                  value={employeeInfo.city}
                  placeholder="City"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    borderColor: activeField === "city" && "#21c55d",
                  }}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                  disabled={employeeMutation.isLoading}
                  required
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
                  value={employeeInfo.image}
                  ref={uploadedImageRef}
                  onChange={(e) => handleChange(e)}
                  accept=".jpg, .jpeg, .png"
                  className="hidden"
                  disabled={employeeMutation.isLoading}
                />
              </label>
              <div className="w-1/2 flex items-center justify-center border rounded-lg relative h-32 overflow-hidden">
                <img
                  src={""}
                  alt="Profile"
                  className="w-24"
                  ref={imagePreviewRef}
                  disabled={employeeMutation.isLoading}
                />
                {profilePicutureIsSet && (
                  <div className="w-full h-full absolute top-0 left-0 bg-gray-500 hover:opacity-90 rounded-lg flex items-center flex-col justify-center gap-4 opacity-0 transition cursor-pointer">
                    <label
                      htmlFor="image"
                      className="bg-white px-2 py-1 rounded-lg text-sm hover:bg-gray-100 cursor-pointer font-semibold"
                    >
                      Replace
                    </label>
                    <label
                      onClick={() => removeImage()}
                      className="bg-white px-2 py-1 rounded-lg text-sm hover:bg-gray-100 cursor-pointer font-semibold"
                    >
                      Remove
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Job details  */}
        <div className="max-w-[600px]">
          <h3 className="text-xl text-gray-800 mt-4">Shift information</h3>
          <div className="border py-6 px-3 rounded-lg mt-2 shadow">
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-center">
                <label className="text-sm">Employement status</label>
                <span className="text-red-600 text-sm">
                  <CgAsterisk />
                </span>
              </div>
              <select
                name={"employementStatus"}
                value={employeeInfo.employementStatus}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  borderColor: activeField === "employementStatus" && "#21c55d",
                }}
                className="outline-none text-sm border py-2 px-2 rounded-sm transition bg-white"
                disabled={employeeMutation.isLoading}
                required
              >
                {employementStatuses.map(({ value, title }) => (
                  <option key={value} value={value}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-center">
                <label className="text-sm">Employement shift</label>
                <span className="text-red-600 text-sm">
                  <CgAsterisk />
                </span>
              </div>
              <select
                name={"shift"}
                value={employeeInfo.shift}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  borderColor: activeField === "shift" && "#21c55d",
                }}
                className="outline-none text-sm border py-2 px-2 rounded-sm transition bg-white"
                disabled={
                  fetchQueries[0].isLoading || employeeMutation.isLoading
                }
                required
              >
                {fetchQueries[0].isSuccess &&
                  fetchQueries[0].data.data.data.map(({ name, id }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        {/* Job details  */}
        <div className="max-w-[600px]">
          <h3 className="text-xl text-gray-800 mt-4">Job Details</h3>
          <div className="border py-6 px-3 rounded-lg mt-2 shadow">
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-center">
                <label className="text-sm">Job title</label>
                <span className="text-red-600 text-sm">
                  <CgAsterisk />
                </span>
              </div>
              <input
                name={"jobTitle"}
                type={"text"}
                value={employeeInfo.jobTitle}
                placeholder="What's your job title"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  borderColor: activeField === "jobTitle" && "#21c55d",
                }}
                className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                disabled={employeeMutation.isLoading}
                required
              />
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-center">
                <label className="text-sm">Department</label>
                <span className="text-red-600 text-sm">
                  <CgAsterisk />
                </span>
              </div>
              <select
                name={"departmentId"}
                value={employeeInfo.departmentId}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  borderColor: activeField === "department" && "#21c55d",
                }}
                className="outline-none text-sm border py-2 px-2 rounded-sm transition bg-white"
                disabled={
                  fetchQueries[1].isLoading || employeeMutation.isLoading
                }
                required
              >
                {fetchQueries[1].isSuccess &&
                  fetchQueries[1].data.data.data.map(({ name, id }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        {/* Location information  */}
        <div className="max-w-[600px]">
          <h3 className="text-xl text-gray-800 mt-4">Work Location</h3>
          <div className="border py-6 px-3 rounded-lg mt-2 shadow">
            <Select
              name={"locations"}
              classNames={{
                control: (state) =>
                  state.isFocused ? "border-green-600" : "border-grey-300",
              }}
              closeMenuOnSelect={true}
              components={animatedComponents}
              value={employeeInfo.locations}
              onChange={handleSelect}
              isLoading={
                fetchQueries[2].isLoading || employeeMutation.isLoading
              }
              disabled={fetchQueries[2].isLoading || employeeMutation.isLoading}
              options={
                fetchQueries[2].isSuccess &&
                fetchQueries[2].data.data.data.map(
                  ({ name, id, location_unique_name }) => ({
                    value: id,
                    label: `${name}(${location_unique_name})`,
                  })
                )
              }
              required
            />
          </div>
        </div>
        <div className="flex justify-between w-full max-w-[600px] mt-8">
          <button
            type="button"
            className="border py-2 px-4 rounded-lg hover:bg-gray-100 transition"
            disabled={employeeMutation.isLoading}
          >
            Discard
          </button>
          <button
            type={"submit"}
            className="border py-2 px-6 bg-green-500 text-white rounded-lg transition hover:bg-green-600"
            disabled={employeeMutation.isLoading}
            style={{
              opacity: employeeMutation.isLoading && 0.7,
              cursor: employeeInfoForm.isLoading ? "not-allowed" : "pointer",
            }}
          >
            Update
          </button>
        </div>
      </form>
      <div className="w-full flex justify-center mt-8">
        <FadeLoader
          color="#199432"
          height={10}
          width={4}
          margin={-6}
          loading={!loadedEmployeeData}
        />
      </div>
    </div>
  );
};
export default EditEmployee;
