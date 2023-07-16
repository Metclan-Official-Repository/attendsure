//importing hooks
import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

//importing icons
import { GrFormViewHide, GrFormView } from "react-icons/gr";

//importing logo
import Logo from "../../assets/logo.png";

//importing services
import { register } from "../../api/business";

const Signup = () => {
  const [activeField, setActiveField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const businessNameRef = useRef();
  const [formdata, setFormdata] = useState({
    businessName: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const businessMutation = useMutation({
    mutationFn: () => register(formdata),
    onSuccess: () => {},
    onError: (err) => {
      console.log(err);
    },
  });
  //functions
  const handleFocus = (e) => setActiveField(e.target.name);
  const handleBlur = () => setActiveField(null);
  const handleChange = (e) =>
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const handleSumbit = (e) => {
    e.preventDefault();
    //sending data to backend
    businessMutation.mutate();
  };
  useEffect(() => {
    //auto focus on email field
    businessNameRef.current.focus();
  }, []);
  return (
    <div className="max-w-[95%] sm:max-w-[400px] mx-auto py-8 rounded-lg mt-8">
      <div className="mt-14">
        <img src={Logo} className="w-48 mx-auto" />
      </div>
      <form className="w-full flex flex-col mt-20 px-2" onSubmit={handleSumbit}>
        <div className="mx-auto w-full">
          <label className="font-medium text-gray-600 text-sm">
            Business Name
          </label>
          <input
            name={"businessName"}
            type={"text"}
            placeholder="Business name"
            className={`w-full border px-4 py-3 rounded-full mt-2 text-sm outline-none transition border-${
              activeField === "email" && "green-600"
            }`}
            onChange={handleChange}
            value={formdata.businessName}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={businessNameRef}
            disabled={businessMutation.isLoading}
            style={{ borderColor: activeField === "businessName" && "#21c55d" }}
            required
          />
        </div>
        {/* User details */}
        <div className="mx-auto w-full">
          <label className="font-medium text-gray-600 text-sm">
            First Name
          </label>
          <input
            name={"firstName"}
            type={"text"}
            placeholder="First name"
            className={`w-full border px-4 py-3 rounded-full mt-2 text-sm outline-none transition border-${
              activeField === "firstName" && "green-600"
            }`}
            onChange={handleChange}
            value={formdata.firstName}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={businessMutation.isLoading}
            style={{ borderColor: activeField === "firstName" && "#21c55d" }}
            required
          />
        </div>
        <div className="mx-auto w-full">
          <label className="font-medium text-gray-600 text-sm">Last Name</label>
          <input
            name={"lastName"}
            type={"text"}
            placeholder="Last name"
            className={`w-full border px-4 py-3 rounded-full mt-2 text-sm outline-none transition border-${
              activeField === "email" && "green-600"
            }`}
            onChange={handleChange}
            value={formdata.lastName}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={businessMutation.isLoading}
            style={{ borderColor: activeField === "lastName" && "#21c55d" }}
            required
          />
        </div>
        <div className="mx-auto w-full mt-4">
          <label className="font-medium text-gray-600 text-sm">Phone</label>
          <input
            name={"phone"}
            type={"phone"}
            placeholder="Phone"
            className={`w-full border px-4 py-3 rounded-full mt-2 text-sm outline-none transition`}
            onChange={handleChange}
            value={formdata.phone}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={businessMutation.isLoading}
            style={{ borderColor: activeField === "phone" && "#21c55d" }}
            required
          />
        </div>
        <div className="mx-auto w-full mt-4">
          <label className="font-medium text-gray-600 text-sm">
            Your email address
          </label>
          <input
            name={"email"}
            type={"email"}
            placeholder="Email address"
            className={`w-full border px-4 py-3 rounded-full mt-2 text-sm outline-none transition`}
            onChange={handleChange}
            value={formdata.email}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={businessMutation.isLoading}
            style={{ borderColor: activeField === "email" && "#21c55d" }}
            required
          />
        </div>
        <div className="mx-auto w-full mt-4">
          <label className="font-medium text-gray-600 text-sm">
            Your password
          </label>
          <div
            className={`mt-2 w-full flex justify-between items-center border px-4 rounded-full transition overflow-hidden border-${
              activeField === "password" && "green-600"
            }`}
          >
            <input
              name={"password"}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className="py-3 transition flex-1 outline-none border-none"
              onChange={handleChange}
              value={formdata.password}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={businessMutation.isLoading}
              style={{ borderColor: activeField === "password" && "#21c55d" }}
              required
            />
            {showPassword ? (
              <GrFormView
                onClick={() => togglePasswordVisibility()}
                className="text-xl cursor-pointer"
              />
            ) : (
              <GrFormViewHide
                onClick={() => togglePasswordVisibility()}
                className="text-xl cursor-pointer"
              />
            )}
          </div>
        </div>
        <div className="mx-auto w-full mt-10">
          <button
            className={`w-full text-center bg-green-500 px-2 py-2 text-white font-medium rounded-full hover:bg-green-600 transition ${
              businessMutation.isLoading ? "bg-green-600" : "bg-green-500"
            }`}
            type="submit"
            style={{
              cursor: businessMutation.isLoading ? "not-allowed" : "pointer",
            }}
            disabled={businessMutation.isLoading}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default Signup;
