//importing hooks
import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

//importing icons
import { GrFormViewHide, GrFormView, GrClose } from "react-icons/gr";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

//import components
import { ClipLoader } from "react-spinners";
import { Footer } from "../../components";

//importing services
import { register } from "../../api/business";
import { fetchCountries } from "../../api/country";

const Signup = () => {
  const [activeField, setActiveField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [signupError, setSignupError] = useState({
    state: false,
    message: "",
  });
  const businessNameRef = useRef();
  const firstNameRef = useRef();
  const navigate = useNavigate();
  const countryQuery = useQuery({
    queryKey: ["COUNTRIES"],
    queryFn: () => fetchCountries(),
  });
  const [formdata, setFormdata] = useState({
    businessName: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    city: "",
    address: "",
    countryId: 1,
  });
  const businessMutation = useMutation({
    mutationFn: () => register(formdata),
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      setSignupError({
        message: error.response.data.message,
        state: true,
      });
    },
  });
  //functions
  const handleFocus = (e) => setActiveField(e.target.name);
  //page number used to determine the form to display
  const [pageNumber, setPageNumber] = useState(0);
  const handleBlur = () => setActiveField(null);
  const handleChange = (e) => {
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSignupError({ state: false });
  };
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSignupError({ state: false });
    if (pageNumber === 0) {
      //check if the business name has been filled
      if (formdata.businessName.length === 0) {
        setSignupError({
          state: true,
          message: "Business name is required",
        });
        return;
      } else if (formdata.businessName.length < 3) {
        setSignupError({
          state: true,
          message: "Business name is too short",
        });
        return;
      } else {
        //increment the page number
        setPageNumber((prev) => prev + 1);
        return;
      }
    }
    //Execute this block when the page number is 1
    if (pageNumber === 1) {
      if (formdata.firstName.length === 0) {
        setSignupError({
          state: true,
          message: "First name is required",
        });
        return;
      }
      if (formdata.email.length === 0) {
        setSignupError({
          state: true,
          message: "Email is required",
        });
        return;
      }
      if (formdata.password.length === 0) {
        setSignupError({
          state: true,
          message: "Password is required",
        });
        return;
      }
      if (formdata.password.length < 5) {
        setSignupError({
          state: true,
          message: "Password must be up to 5 characters",
        });
        return;
      }
    }
    if (!signupError.state) {
      businessMutation.mutate();
    }
  };
  useEffect(() => {
    //auto focus on email field
    if (businessNameRef.current) {
      businessNameRef.current.focus();
    }
    if (firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, []);
  return (
    <div>
      <div className="max-w-[95%] sm:max-w-[400px] mx-auto py-8 rounded-lg mt-8">
        <form
          className="w-full flex flex-col mt-18 px-8 py-16 border rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="text-center mb-5">
            <a
              href="/"
              className="text-xl sm:text-3xl text-green-600 font-bold text-center hover:text-green-600 transition"
            >
              Attend<span className="text-black">Sure</span>
            </a>
            <p>Start your free trial</p>
          </div>
          <div
            style={{ visibility: signupError.state ? "visible" : "hidden" }}
            className="flex items-center justify-between  border py-2 px-4 rounded-lg bg-red-200 text-sm text-red-900 mt-6 mb-5"
          >
            <h4>{signupError.message}</h4>
            <GrClose
              className="cursor-pointer"
              onClick={() => setSignupError({ state: false })}
            />
          </div>

          {/* First stage of registration*/}
          {pageNumber === 0 && (
            <div>
              <div className="mx-auto w-full">
                <label className="font-medium text-gray-600 text-sm">
                  Business name
                </label>
                <input
                  name={"businessName"}
                  type={"text"}
                  placeholder="What's your business name?"
                  className={`w-full border-2 px-4 py-3 rounded-lg mt-2 text-sm outline-none transition border-${
                    activeField === "businessName" && "green-600"
                  }`}
                  onChange={handleChange}
                  value={formdata.businessName}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  ref={businessNameRef}
                  disabled={businessMutation.isLoading}
                  required
                />
              </div>
              <div className="mx-auto w-full mt-4">
                <label className="font-medium text-gray-600 text-sm">
                  Country
                </label>
                <select
                  name={"countryId"}
                  className={`w-full border-2 px-4 py-3 rounded-lg mt-2 text-sm outline-none transition border-${
                    activeField === "countryId" && "green-600"
                  }`}
                  onChange={handleChange}
                  value={formdata.countryId}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  disabled={
                    fetchCountries.isLoading || businessMutation.isLoading
                  }
                  style={{
                    borderColor: activeField === "countryId" && "#21c55d",
                  }}
                  required
                >
                  {countryQuery.isSuccess &&
                    countryQuery.data.data.data.map(
                      ({ id, nicename, phonecode }) => (
                        <option
                          key={id}
                          value={id}
                        >{`${nicename} (${phonecode})`}</option>
                      )
                    )}
                </select>
              </div>
            </div>
          )}
          {/* Second stage of registration*/}
          {pageNumber === 1 && (
            <div>
              <div className="mx-auto w-full">
                <label className="font-medium text-gray-600 text-sm">
                  First Name
                </label>
                <input
                  name={"firstName"}
                  type={"text"}
                  placeholder="What's your first name?"
                  className={`w-full border-2 px-4 py-3 rounded-lg mt-2 text-sm outline-none transition border-${
                    activeField === "firstName" && "green-600"
                  }`}
                  onChange={handleChange}
                  value={formdata.firstName}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  ref={firstNameRef}
                  disabled={businessMutation.isLoading}
                  required
                />
              </div>
              <div className="mx-auto w-full">
                <label className="font-medium text-gray-600 text-sm">
                  Last Name
                </label>
                <input
                  name={"lastName"}
                  type={"text"}
                  placeholder="What is your last name?"
                  className={`w-full border-2 px-4 py-3 rounded-lg mt-2 text-sm outline-none transition border-${
                    activeField === "lastName" && "green-600"
                  }`}
                  onChange={handleChange}
                  value={formdata.lastName}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  disabled={businessMutation.isLoading}
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
                  className={`w-full border-2 px-4 py-3 rounded-lg mt-2 text-sm outline-none transition border-${
                    activeField === "email" && "green-600"
                  }`}
                  onChange={handleChange}
                  value={formdata.email}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  disabled={businessMutation.isLoading}
                  required
                />
              </div>
              <div className="mx-auto w-full mt-4">
                <label className="font-medium text-gray-600 text-sm">
                  Your password
                </label>
                <div
                  className={`mt-2 w-full flex justify-between items-center border-2 px-4 rounded-lg transition overflow-hidden border-${
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
            </div>
          )}
          <div className="mx-auto w-full mt-10 flex justify-between">
            <button
              className={`text-center bg-green-500 px-5 py-[10px] text-xl font-bold text-white font-medium rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2 inline-block${
                businessMutation.isLoading ? "bg-green-600" : "bg-green-500"
              }`}
              type="button"
              style={{
                cursor: businessMutation.isLoading ? "not-allowed" : "pointer",
                backgroundColor: businessMutation.isLoading && "#16a34a",
                visibility: pageNumber < 1 ? "hidden" : "visible",
              }}
              onClick={() => setPageNumber((prev) => prev - 1)}
              disabled={businessMutation.isLoading}
            >
              <AiOutlineArrowLeft />
            </button>
            <button
              className={`text-center bg-green-500 px-5 py-[10px] text-xl font-bold text-white font-medium rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2 inline-block${
                businessMutation.isLoading ? "bg-green-600" : "bg-green-500"
              }`}
              type="button"
              style={{
                cursor: businessMutation.isLoading ? "not-allowed" : "pointer",
                backgroundColor: businessMutation.isLoading && "#16a34a",
              }}
              disabled={businessMutation.isLoading}
              onClick={handleSubmit}
            >
              <ClipLoader
                size={18}
                color="#fff"
                loading={businessMutation.isLoading}
              />
              <AiOutlineArrowRight />
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default Signup;
