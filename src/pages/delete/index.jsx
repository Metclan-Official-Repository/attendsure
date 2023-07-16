//importing hooks
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

//importing services
import { deleteEmployee } from "../../api/employees";
import { deleteDepartment } from "../../api/departments";
import { deleteShift } from "../../api/shift";

//importing delete reducers
import { reducerSuccess } from "./reducer";

//import components
import { toast } from "react-toastify";
//importing icons
import { ImCancelCircle } from "react-icons/im";

const Delete = ({ item, deleteItem, showDelete }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const cancelDelete = () => {
    !deletionMutation.isLoading &&
      deleteItem({
        item: "",
        enabled: false,
        action: "",
        id: "",
      });
  };
  const resetDelete = () => {
    deleteItem({
      item: "",
      enabled: false,
      action: "",
      id: "",
    });
  };
  const deletionMutation = useMutation({
    mutationFn: () => {
      if (showDelete.action === "DELETE_DEPARTMENT") {
        return deleteDepartment({
          id: showDelete.id,
        });
      }
      if (showDelete.action === "DELETE_EMPLOYEE") {
        return deleteEmployee({
          id: showDelete.id,
        });
      }
      if (showDelete.action === "DELETE_SHIFT") {
        return deleteShift({
          id: showDelete.id,
        });
      }
    },
    onSuccess: () => {
      reducerSuccess(showDelete.action, navigate, queryClient);
      resetDelete();
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
  return (
    <div className="fixed w-screen h-screen top-0 left-0 dialog flex justify-center items-center">
      <div className="bg-white px-4 md:px-6 rounded-lg w-[95%] h-44 py-6 flex flex-col justify-between sm:w-96 shadow-lg md:h-60 md:w-[500px]">
        <div className="flex items-center justify-between text-gray-700">
          <h1 className="font-semibold text-lg md:text-2xl">Confirm delete</h1>
          <ImCancelCircle
            onClick={cancelDelete}
            className="text-gray-400 text-lg md:text-2xl cursor-pointer hover:text-gray-500 transition"
          />
        </div>
        <p className="text-sm md:text-lg">
          {" "}
          Are you sure you want to delete "{item}"?
        </p>
        <div className="flex items-center gap-4">
          <button
            className="text-sm md:text-[16px] bg-red-500 px-4 py-2 rounded-[3px] text-white hover:bg-red-600 transition"
            disabled={deletionMutation.isLoading}
            onClick={() => deletionMutation.mutate()}
            style={{
              opacity: deletionMutation.isLoading && 0.7,
              cursor: deletionMutation.isLoading ? "not-allowed" : "pointer",
            }}
          >
            {deletionMutation.isLoading ? "Deleting" : "Yes, delete it"}
          </button>
          <button
            onClick={cancelDelete}
            className="text-sm md:text-[16px] text-gray-600 hover:underline transition"
          >
            No, keep it
          </button>
        </div>
      </div>
    </div>
  );
};
export default Delete;
