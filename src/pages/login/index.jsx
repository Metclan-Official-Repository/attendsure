//importing hooks
import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

//importing icons
import { GrFormViewHide, GrFormView } from "react-icons/gr";

//importing logo
import Logo from "../../assets/logo.png";

//importing services
import { login } from "../../api/business";

const Login = () => {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const [activeField, setActiveField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const loginMutation = useMutation({
    mutationFn: () => login(formdata),
    onSuccess: (data) => {
      const token = data.data.data.token;
      const username = data.data.data._name;
      window.localStorage.setItem("_token", token);
      window.location = "/";
    },
  });
  //functions
  const handleFocus = (e) => setActiveField(e.target.name);
  const handleBlur = () => setActiveField(null);
  const handleChange = (e) =>
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate();
  };
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  useEffect(() => {
    //auto focus on email field
    emailRef.current.focus();
  }, []);
  if (localStorage.getItem("_token")) {
    navigate("/");
  }
  return (
    <div className="max-w-[95%] sm:max-w-[400px] mx-auto py-8 rounded-lg mt-8">
      <div className="mt-14">
        <img src={Logo} className="w-48 mx-auto" />
      </div>
      <form className="w-full flex flex-col mt-20 px-2" onSubmit={handleSubmit}>
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
            onChange={handleChange}
            value={formdata.email}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={emailRef}
            disabled={loginMutation.isLoading}
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
              disabled={loginMutation.isLoading}
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
              loginMutation.isLoading ? "bg-green-600" : "bg-green-500"
            }`}
            type="submit"
            style={{
              cursor: loginMutation.isLoading ? "not-allowed" : "pointer",
            }}
            disabled={loginMutation.isLoading}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
