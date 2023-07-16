//importing animations
import { motion } from "framer-motion";
import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

//importing components
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";

//importing services
import { fetchLocations, editLocation } from "../../../api/locations";

//importing icons
import { GrClose } from "react-icons/gr";

const EditLocation = ({ id, onClick }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeField, setActiveField] = useState(false);
  const [locationInfo, setLocationInfo] = useState({
    name: "",
    address: "",
  });
  const handleBlur = () => setActiveField(null);
  const handleFocus = (e) => setActiveField(e.target.name);
  const handleChange = (e) =>
    setLocationInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const mutateLocation = useMutation({
    mutationFn: () => editLocation(locationInfo),
    onSuccess: () => {
      onClick();
      navigate("/settings/locations");
      toast.success("Location updated");
      queryClient.invalidateQueries("LOCATIONS");
    },
    onError: (e) => {
      onClick();
      navigate("/settings/locations");
      toast.error("An error occurred");
      console.log(e);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutateLocation.mutate();
  };
  const fetchLocationsQuery = useQuery({
    queryKey: ["LOCATION"],
    queryFn: () => fetchLocations({ id: id }),
    onSuccess: (data) => {
      const { name, address, id } = data.data.data[0];
      setLocationInfo({ name: name, address, id: id });
    },
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 250 }}
      exit={{ opacity: 0, y: 100 }}
    >
      <div className="bg-white w-[90%] mx-auto mt-[200px] max-w-[750px] rounded-lg relative p-6 h-[400px]">
        <GrClose
          className="bg-white absolute top-[-5%] right-[-2%] text-4xl p-2 rounded-full text-gray-500 hover:text-gray-900 cursor-pointer hover:bg-gray-100"
          onClick={onClick}
        />
        <h3 className="text-xl text-gray-800 mt-4">
          Update Location information
        </h3>
        <form
          onSubmit={handleSubmit}
          style={{ display: fetchLocationsQuery.isSuccess ? "block" : "none" }}
        >
          <div className="w-full mt-6">
            <div className="py-6">
              <div className="flex flex-col gap-1 mt-2">
                <label className="text-sm">Location Name</label>
                <input
                  name={"name"}
                  type={"text"}
                  value={locationInfo.name}
                  placeholder="Location name"
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
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full mt-8">
            <button
              type="button"
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
            loading={fetchLocationsQuery.isLoading}
          />
        </div>
      </div>
    </motion.div>
  );
};
export default EditLocation;
