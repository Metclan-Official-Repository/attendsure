//importing animations
import { motion } from "framer-motion";
import { useState } from "react";
import { useMutation, useQueryClient, useQueries } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

//importing components
import { toast } from "react-toastify";
import makeAnimated from "react-select/animated";
import Select from "react-select";

//importing services
import { fetchLocations } from "../../../api/locations";
import { fetchRoles } from "../../../api/roles";
import { addUsers } from "../../../api/users";

//importing icons
import { GrClose } from "react-icons/gr";

const NewUser = ({ onClick }) => {
  const navigate = useNavigate();
  const [userError, setUserError] = useState(false);
  const queryClient = useQueryClient();
  const [activeField, setActiveField] = useState(false);
  const animatedComponents = makeAnimated();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    roleId: "",
    locations: [],
    verifyPassword: function () {
      if (this.password === this.confirmPassword) {
        return true;
      } else {
        return false;
      }
    },
  });
  const handleBlur = () => setActiveField(null);
  const handleFocus = (e) => setActiveField(e.target.name);
  const handleChange = (e) =>
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const userMutation = useMutation({
    mutationFn: () => addUsers(userInfo),
    onSuccess: () => {
      onClick();
      navigate("/settings/users");
      toast.success("User created");
      queryClient.invalidateQueries("USERS");
    },
    onError: (e) => {
      onClick();
      navigate("/settings/users");
      toast.error("An error occurred");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInfo.verifyPassword()) {
      userMutation.mutate();
    } else {
      toast.error("Passwords do not match");
    }
  };
  const handleSelect = (value) => {
    setUserInfo((prev) => ({ ...prev, locations: value }));
  };
  const userQuery = useQueries({
    queries: [
      {
        queryKey: ["LOCATIONS"],
        queryFn: () => fetchLocations(),
      },
      {
        queryKey: ["ROLES"],
        queryFn: () => fetchRoles(),
        onSuccess: (data) => {
          const admin = data.data.data.find(({ is_admin }) => is_admin === 1);
          setUserInfo((prev) => ({ ...prev, roleId: admin.id }));
        },
      },
    ],
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 250 }}
      exit={{ opacity: 0, y: 100 }}
      className="overflow-y-auto"
    >
      <div className="bg-white w-[90%] mx-auto mt-[100px] max-w-[750px] rounded-lg relative p-6">
        <GrClose
          className="bg-white absolute top-[-5%] right-[-2%] text-4xl p-2 rounded-full text-gray-500 hover:text-gray-900 cursor-pointer hover:bg-gray-100"
          onClick={onClick}
        />
        <form onSubmit={handleSubmit}>
          <div className="w-full mt-6">
            <h3 className="text-xl text-gray-800 mt-4">User information</h3>
            <div className="py-6">
              <div className="md:flex justify-between gap-4">
                <div className="flex flex-col gap-1 mt-2 flex-1">
                  <label className="text-sm">First Name</label>
                  <input
                    name={"firstName"}
                    type={"text"}
                    value={userInfo.firstName}
                    placeholder="First name"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{
                      borderColor: activeField === "firstName" && "#21c55d",
                    }}
                    disabled={userMutation.isLoading}
                    className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1 mt-2 flex-1">
                  <label className="text-sm">Last Name</label>
                  <input
                    name={"lastName"}
                    type={"text"}
                    value={userInfo.lastName}
                    placeholder="Last name"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{
                      borderColor: activeField === "lastName" && "#21c55d",
                    }}
                    disabled={userMutation.isLoading}
                    className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                    required
                  />
                </div>
              </div>
              <div className="md:flex justify-between gap-4">
                <div className="flex flex-col gap-1 mt-2 flex-1">
                  <label className="text-sm">Email</label>
                  <input
                    name={"email"}
                    type={"email"}
                    value={userInfo.email}
                    placeholder="Email"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{
                      borderColor: activeField === "email" && "#21c55d",
                    }}
                    disabled={userMutation.isLoading}
                    className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                    required
                  />
                  {
                    <small
                      style={{ visibility: userError ? "visible" : "hidden" }}
                      className="font-poppins text-red-500"
                    >
                      Incorrect email or user already exists
                    </small>
                  }
                </div>
                <div className="flex flex-col gap-1 mt-2 flex-1">
                  <label className="text-sm">Phone</label>
                  <input
                    name={"phone"}
                    type={"text"}
                    value={userInfo.phone}
                    placeholder="Phone"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{
                      borderColor: activeField === "phone" && "#21c55d",
                    }}
                    disabled={userMutation.isLoading}
                    className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                    required
                  />
                </div>
              </div>
              <div className="md:flex justify-between gap-4">
                <div className="flex flex-col gap-1 mt-2 flex-1">
                  <label className="text-sm">Password</label>
                  <input
                    name={"password"}
                    type={"password"}
                    value={userInfo.password}
                    placeholder="Password"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{
                      borderColor: activeField === "password" && "#21c55d",
                    }}
                    disabled={userMutation.isLoading}
                    className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1 mt-2 flex-1">
                  <label className="text-sm">Confirm Password</label>
                  <input
                    name={"confirmPassword"}
                    type={"password"}
                    value={userInfo.confirmPassword}
                    placeholder="Confirm password"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{
                      borderColor:
                        activeField === "confirmPassword" && "#21c55d",
                    }}
                    disabled={userMutation.isLoading}
                    className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label className="text-sm">Role</label>
            <select
              name={"roleId"}
              value={userInfo.roleId}
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, roleId: e.target.value }))
              }
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{
                borderColor: activeField === "employementStatus" && "#21c55d",
              }}
              className="outline-none text-sm border py-2 px-2 rounded-sm transition bg-white"
              disabled={userQuery[1].isLoading}
              required
            >
              {userQuery[1].isSuccess &&
                userQuery[1].data.data.data.map(({ id, name }) => {
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                })}
            </select>
          </div>
          {/* Location information  */}
          <div className="mt-4">
            <label className="text-sm">Locations</label>
            <Select
              name={"locations"}
              classNames={{
                control: (state) =>
                  state.isFocused ? "border-green-600" : "border-grey-300",
              }}
              closeMenuOnSelect={false}
              components={animatedComponents}
              value={userInfo.locations}
              onChange={handleSelect}
              isMulti
              isLoading={userQuery[0].isLoading || userMutation.isLoading}
              disabled={userQuery[0].isLoading || userMutation.isLoading}
              options={
                userQuery[0].isSuccess &&
                userQuery[0].data.data.data.map(
                  ({ name, id, location_unique_name }) => ({
                    value: id,
                    label: `${name}(${location_unique_name})`,
                  })
                )
              }
              required
            />
          </div>
          <div className="flex justify-between w-full mt-8">
            <button
              type={"button"}
              className="border py-2 px-4 rounded-lg hover:bg-gray-100 transition"
              onClick={onClick}
            >
              Discard
            </button>
            <button
              type={"submit"}
              className="border py-2 px-6 bg-green-500 text-white rounded-lg transition hover:bg-green-600"
              style={{
                cursor: userMutation.isLoading ? "not-allowed" : "pointer",
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
export default NewUser;
