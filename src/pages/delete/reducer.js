import { toast } from "react-toastify";
const reducerSuccess = (showDelete, navigate, queryClient) => {
  switch (showDelete) {
    case "DELETE_EMPLOYEE":
      queryClient.invalidateQueries("EMPLOYEES");
      navigate("/employees");
      toast.success("Employee deleted");
      break;
    case "DELETE_DEPARTMENT":
      queryClient.invalidateQueries("DEPARTMENTS");
      navigate("/departments");
      toast.success("Department deleted");
      break;
    case "DELETE_SHIFT":
      queryClient.invalidateQueries("SHIFTS");
      navigate("/shifts");
      toast.success("Shift deleted");
      break;
  }
};

export { reducerSuccess };
