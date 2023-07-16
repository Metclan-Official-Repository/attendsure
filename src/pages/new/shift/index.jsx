//importing hooks
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

//importing components
import TimePicker from "react-time-picker";
import { toast } from "react-toastify";

//import icons
import { BiArrowBack } from "react-icons/bi";

//importing services
import { addShift } from "../../../api/shift";

//importing styles
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const NewShift = () => {
  const navigate = useNavigate();
  const [shiftInfo, setShiftInfo] = useState({
    name: "",
    startTime: "9:00",
    endTime: "17:00",
  });
  const [activeField, setActiveField] = useState(null);
  const handleChange = (e) =>
    setShiftInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleBlur = () => setActiveField(null);
  const handleFocus = (e) => setActiveField(e.target.name);
  const mutateShifts = useMutation({
    mutationFn: () => addShift(shiftInfo),
    onSuccess: () => {
      navigate("/shifts");
      toast.success("Shift created.");
    },
    onError: () => {
      toast.error("An error occurred");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutateShifts.mutate();
  };
  return (
    <div className="mx-auto w-[95%] mb-28">
      <div className="flex items-center gap-4 mt-8">
        <a
          href="/shifts"
          className="w-10 h-10 md:w-12 md:h-12 border flex items-center justify-center cursor-pointer hover:bg-gray-100 transition text-gray-500"
        >
          <BiArrowBack className="text-xl md:text-3xl" />
        </a>
        <div>
          <div className="text-xs md:text-sm">Back to shifts list</div>
          <h4 className="text-gray-800 font-semibold text-sm md:text-xl">
            Add New Shift
          </h4>
        </div>
      </div>
      {/* Contact details  */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="w-full max-w-[600px] mt-12">
          <h3 className="text-xl text-gray-800 mt-4">Shift information</h3>
          <div className="border py-6 px-3 rounded-lg mt-2 shadow">
            <div className="flex flex-col gap-1 mt-2">
              <label className="text-sm">Shift Name</label>
              <input
                name={"name"}
                type={"text"}
                value={shiftInfo.name}
                placeholder="Shift name"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  borderColor: activeField === "name" && "#21c55d",
                }}
                disabled={mutateShifts.isLoading}
                className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                required
              />
            </div>
            <div className="flex justify-between mt-8">
              <div className="flex flex-col">
                <label className="text-sm">Start time </label>
                <TimePicker
                  value={shiftInfo.startTime}
                  onChange={(value) =>
                    setShiftInfo((prev) => ({ ...prev, startTime: value }))
                  }
                  required
                  disabled={mutateShifts.isLoading}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm">End time </label>
                <TimePicker
                  value={shiftInfo.endTime}
                  onChange={(value) =>
                    setShiftInfo((prev) => ({ ...prev, endTime: value }))
                  }
                  required
                  className="border-none outline-none"
                  disabled={mutateShifts.isLoading}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full max-w-[600px] mt-8">
          <button className="border py-2 px-4 rounded-lg hover:bg-gray-100 transition">
            Discard
          </button>
          <button
            type={"submit"}
            className="border py-2 px-6 bg-green-500 text-white rounded-lg transition hover:bg-green-600"
            style={{
              cursor: mutateShifts.isLoading ? "not-allowed" : "pointer",
              backgroundColor: mutateShifts.isLoading && "green",
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default NewShift;
