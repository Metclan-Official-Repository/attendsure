//import hooks
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//importing services
import { addDepartment } from "../../../api/departments";
//importing icons
import { BiArrowBack } from "react-icons/bi";

//importing styles
import "react-toastify/dist/ReactToastify.css";

const NewDepartment = () => {
  const navigate = useNavigate();
  const [activeField, setActiveField] = useState(null);
  const [departmentInfo, setDepartmentInfo] = useState({
    name: "",
  });

  //form actions
  const handleFocus = (e) => setActiveField(e.target.name);
  const handleBlur = () => setActiveField(null);
  const handleChange = (e) =>
    setDepartmentInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    mutateDepartments.mutate();
  };

  //mutation request
  const mutateDepartments = useMutation({
    mutationFn: () =>
      addDepartment({
        name: departmentInfo.name,
      }),
    onSuccess: () => {
      toast.success("Department created.");
      navigate("/departments");
    },
    onError: () => {
      toast.error("An error occurred");
    },
  });
  return (
    <div className="mx-auto w-[95%] mb-28">
      <div className="flex items-center gap-4 mt-8">
        <a
          href="/departments"
          className="w-10 h-10 md:w-12 md:h-12 border flex items-center justify-center cursor-pointer hover:bg-gray-100 transition text-gray-500"
        >
          <BiArrowBack className="text-xl md:text-3xl" />
        </a>
        <div>
          <div className="text-xs md:text-sm">Back to departments list</div>
          <h4 className="text-gray-800 font-semibold text-sm md:text-xl">
            Add New Department
          </h4>
        </div>
      </div>
      {/* Contact details  */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="w-full max-w-[600px] mt-12">
          <h3 className="text-xl text-gray-800 mt-4">Department information</h3>
          <div className="border py-6 px-3 rounded-lg mt-2 shadow">
            <div className="flex flex-col gap-1 mt-2">
              <label className="text-sm">Department Name</label>
              <input
                name={"name"}
                type={"text"}
                value={departmentInfo.name}
                placeholder="Department name"
                onChange={(e) => handleChange(e)}
                onFocus={(e) => handleFocus(e)}
                onBlur={(e) => handleBlur(e)}
                style={{
                  borderColor: activeField === "name" && "#21c55d",
                }}
                disabled={mutateDepartments.isLoading}
                className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                required
              />
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
              cursor: mutateDepartments.isLoading ? "not-allowed" : "pointer",
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default NewDepartment;
