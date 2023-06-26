import { useState, useRef, useEffect } from "react";
import { GrFormViewHide, GrFormView } from "react-icons/gr";
import Logo from "../../assets/logo.png";
const Login = () => {
  const [activeField, setActiveField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  //functions
  const handleFocus = (e) => setActiveField(e.target.name);
  const handleBlur = () => setActiveField(null);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  useEffect(() => {
    //auto focus on email field
    emailRef.current.focus();
  }, []);
  return (
    <div className="max-w-[95%] sm:max-w-[400px] mx-auto py-8 rounded-lg mt-8">
      <div className="mt-14">
        <img src={Logo} className="w-48 mx-auto" />
      </div>
      <form className="w-full flex flex-col mt-20 px-2">
        <div className="mx-auto w-full">
          <label className="font-medium text-gray-600 text-sm">
            Your email address
          </label>
          <input
            name={"email"}
            placeholder="Email address"
            className={`w-full border px-4 py-3 rounded-full mt-2 text-sm outline-none transition border-${
              activeField === "email" && "green-600"
            }`}
            onFocus={(e) => handleFocus(e)}
            onBlur={() => handleBlur()}
            ref={emailRef}
            disabled={loading}
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
              onFocus={(e) => handleFocus(e)}
              onBlur={() => handleBlur()}
              disabled={loading}
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
              loading ? "bg-green-600" : "bg-green-500"
            }`}
            type="submit"
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
            disabled={loading}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
