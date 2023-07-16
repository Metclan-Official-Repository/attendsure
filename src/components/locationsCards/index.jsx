//importing hooks
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//import components
import Toggle from "react-toggle";
import { toast } from "react-toastify";
import Backdrop from "../backdrop";
import EditLocation from "../../pages/edit/locations";

//import services
import { disableLocation, enableLocation } from "../../api/locations";

const LocationsCard = ({ id, name, address, uniqueName, isActive }) => {
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const locationMutation = useMutation({
    mutationFn: () =>
      isActive ? disableLocation({ id: id }) : enableLocation({ id: id }),
    onSuccess: () => {
      isActive
        ? toast.success("Location disabled")
        : toast.success("Location enabled");
      navigate("/settings/locations");
      queryClient.invalidateQueries("LOCATIONS");
    },
    onError: () => {
      toast.error("An error occurred");
    },
  });
  const handleToggle = () => {
    locationMutation.mutate();
  };
  return (
    <div className="flex justify-between border-b py-4 rounded-lg">
      <div>
        <div className="font-poppins text-gray-600">
          {name} ({uniqueName})
        </div>
        <div className="text-sm font-poppins font-light mt-2 hidden md:block">
          {address}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="text-sm font-medium text-blue-500 hover:text-blue-700 hover:font-bold transition"
          onClick={() => setShowModal(true)}
        >
          Edit
        </button>
        <Toggle
          onChange={handleToggle}
          checked={isActive ? true : false}
          disabled={locationMutation.isLoading}
        />
      </div>
      <Backdrop
        display={showModal}
        children={<EditLocation id={id} onClick={() => setShowModal(false)} />}
      />
    </div>
  );
};

export default LocationsCard;
