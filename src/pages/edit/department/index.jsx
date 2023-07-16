//import hooks
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

//importing components
import { FadeLoader } from "react-spinners";
//importing services
import { editDepartment, fetchDepartments } from "../../../api/departments";
//importing icons
import { BiArrowBack } from "react-icons/bi";

//importing styles
import "react-toastify/dist/ReactToastify.css";

const EditDepartment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const search = new URLSearchParams(location.search);
  const departmentId = search.get("departmentId");
  const [activeField, setActiveField] = useState(null);
  const [departmentInfo, setDepartmentInfo] = useState({
    name: "",
    id: "",
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
      editDepartment({
        name: departmentInfo.name,
        id: departmentInfo.id,
      }),
    onSuccess: () => {
      toast.success("Department edited.");
      navigate("/departments");
    },
    onError: (err) => {
      console.log(err);
      toast.error("An error occurred");
      navigate("/departments");
    },
  });
  //fetch department
  const fetchDepartment = useQuery({
    queryKey: ["DEPARTMENT"],
    queryFn: () =>
      fetchDepartments({
        id: Number(departmentId),
      }),
    onSuccess: (data) => {
      setDepartmentInfo({
        name: data.data.data[0].name,
        id: data.data.data[0].id,
      });
    },
    onError: (err) => {
      console.log(err);
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
            Edit Department
          </h4>
        </div>
      </div>
      <div className="w-full flex justify-center mt-8">
        <FadeLoader
          color="#199432"
          height={10}
          width={4}
          margin={-6}
          loading={fetchDepartment.isLoading}
        />
      </div>
      {/* Department details  */}
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{ display: fetchDepartment.isSuccess ? "block" : "none" }}
      >
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
          <button
            className="border py-2 px-4 rounded-lg hover:bg-gray-100 transition"
            type={"button"}
            onClick={() => navigate("/departments")}
          >
            Discard
          </button>
          <button
            type={"submit"}
            className="border py-2 px-6 bg-green-500 text-white rounded-lg transition hover:bg-green-600"
            style={{
              cursor: mutateDepartments.isLoading ? "not-allowed" : "pointer",
            }}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditDepartment;
