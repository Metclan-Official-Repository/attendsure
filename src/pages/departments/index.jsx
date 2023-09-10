//import hooks
import { useQuery } from "@tanstack/react-query";

//importing services
import { fetchDepartments } from "../../api/departments";

//importing components
import { FadeLoader } from "react-spinners";
//importing icons
import { BiPlusCircle } from "react-icons/bi";
import { DepartmentCard } from "../../components";

//importing functions
import { checkRole } from "../../helper";

const Department = ({ deleteItem }) => {
  const departmentsQuery = useQuery({
    queryKey: ["DEPARTMENTS"],
    queryFn: () => fetchDepartments(),
  });
  return (
    <div className="w-[95%] mx-auto">
      <div className="flex items-center justify-between">
        <div className="mt-4">
          <div className="w-16 h-1 bg-orange-400"></div>
          <h4 className="text-xl font-medium text-gray-600">Departments</h4>
        </div>
        <div className="mt-4">
          {checkRole("departments.new") && (
            <a
              href="/departments/new"
              className="flex items-center gap-2 text-center bg-green-500 px-6 py-2 text-white text-sm rounded-lg hover:bg-green-600 transition"
            >
              <BiPlusCircle />
              <p>Add New</p>
            </a>
          )}
        </div>
      </div>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-center gap-2 gap-y-2 mt-4">
        {departmentsQuery.isSuccess &&
          departmentsQuery.data.data.data.map(({ name, id }) => (
            <DepartmentCard
              name={name}
              key={id}
              id={id}
              deleteItem={deleteItem}
            />
          ))}
      </div>
      <div className="w-full flex justify-center mt-8">
        <FadeLoader
          color="#199432"
          height={10}
          width={4}
          margin={-6}
          loading={departmentsQuery.isLoading}
        />
      </div>
    </div>
  );
};
export default Department;
