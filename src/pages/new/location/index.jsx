//importing animations
import { motion } from "framer-motion";
import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

//importing components
import { toast } from "react-toastify";
import Backdrop from "../../../components/backdrop";
import Upgrade from "../../upgrade";

//importing services
import { addLocation } from "../../../api/locations";
import { fetchCountries } from "../../../api/country";

//importing icons
import { GrClose } from "react-icons/gr";

const NewLocation = ({ onClick }) => {
  const navigate = useNavigate();
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState("");
  const countries = useQuery({
    queryKey: ["COUNTRIES"],
    queryFn: () => fetchCountries(),
    onError: () => {
      countries.refetch();
    },
  });
  const queryClient = useQueryClient();
  const [activeField, setActiveField] = useState(false);
  const [locationInfo, setLocationInfo] = useState({
    name: "",
    address: "",
    city: "",
    countryId: 1,
  });
  const handleBlur = () => setActiveField(null);
  const handleFocus = (e) => setActiveField(e.target.name);
  const handleChange = (e) =>
    setLocationInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const mutateLocation = useMutation({
    mutationFn: () => addLocation(locationInfo),
    onSuccess: () => {
      onClick();
      navigate("/settings/locations");
      toast.success("Location created");
      queryClient.invalidateQueries("LOCATIONS");
    },
    onError: (err) => {
      if (err.response.status) {
        setUpgradeMessage(err.response.data.message);
        setShowBackdrop(true);
      } else {
        onClick();
        navigate("/settings/locations");
        toast.error("An error occurred");
      }
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutateLocation.mutate();
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 250 }}
      exit={{ opacity: 0, y: 100 }}
    >
      <div className="bg-white w-[90%] mx-auto mt-[200px] max-w-[750px] rounded-lg relative p-6">
        <GrClose
          className="bg-white absolute top-[-5%] right-[-2%] text-4xl p-2 rounded-full text-gray-500 hover:text-gray-900 cursor-pointer hover:bg-gray-100"
          onClick={onClick}
        />
        <form onSubmit={handleSubmit}>
          <div className="w-full mt-6">
            <h3 className="text-xl text-gray-800 mt-4">Location information</h3>
            <div className="py-6">
              <div className="flex flex-col gap-1 mt-2">
                <label className="text-sm">Location Name</label>
                <input
                  name={"name"}
                  type={"text"}
                  value={locationInfo.name}
                  placeholder="Business location name"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    borderColor: activeField === "name" && "#21c55d",
                  }}
                  disabled={mutateLocation.isLoading}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                  required
                />
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <label className="text-sm">Location address</label>
                <input
                  name={"address"}
                  type={"text"}
                  value={locationInfo.address}
                  placeholder="Location address"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    borderColor: activeField === "address" && "#21c55d",
                  }}
                  disabled={mutateLocation.isLoading}
                  className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                />
              </div>
            </div>
          </div>
          {/* Address and city */}
          <div className="flex justify-between">
            <div className="flex flex-col gap-1 mt-2">
              <label className="text-sm">City</label>
              <input
                name={"city"}
                type={"text"}
                value={locationInfo.city}
                placeholder="City"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  borderColor: activeField === "city" && "#21c55d",
                }}
                disabled={mutateLocation.isLoading}
                className="outline-none text-sm border py-2 px-2 rounded-sm transition"
              />
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <label className="text-sm">Location address</label>
              <select
                name={"countryId"}
                value={locationInfo.countryId}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  borderColor: activeField === "countryId" && "#21c55d",
                }}
                className="outline-none text-sm border py-2 px-2 rounded-sm transition bg-white"
                disabled={countries.isLoading}
                required
              >
                {countries.data?.data.data.map(
                  ({ nicename, phonecode, id }) => (
                    <option key={id} value={id}>
                      {nicename}({phonecode})
                    </option>
                  )
                )}
              </select>
            </div>
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
                cursor: mutateLocation.isLoading ? "not-allowed" : "pointer",
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <Backdrop
        children={
          <Upgrade
            message={upgradeMessage}
            onClick={() => setShowBackdrop(false)}
          />
        }
        display={showBackdrop}
      />
    </motion.div>
  );
};
export default NewLocation;
