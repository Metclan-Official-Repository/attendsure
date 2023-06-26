import { useQuery } from "@tanstack/react-query";
//importing components
import { EmployeeCard } from "../../components";
import { SyncLoader } from "react-spinners";

//importing icons
import { BiPlusCircle } from "react-icons/bi";

//importing services
import { fetchEmployee } from "../../api/employees";
const Employees = () => {
  const employeesQuery = useQuery({
    queryKey: ["EMPLOYEES"],
    queryFn: () => fetchEmployee(),
  });
  return (
    <div className="w-[95%] mx-auto">
      <div className="flex items-center justify-between">
        <div className="mt-4">
          <div className="w-16 h-1 bg-purple-400"></div>
          <h4 className="text-xl font-medium text-gray-600">Employees</h4>
        </div>
        <div className="mt-4">
          <a
            href="/employees/new"
            className="flex items-center gap-2 text-center bg-green-500 px-6 py-2 text-white text-sm rounded-lg hover:bg-green-600 transition"
          >
            <BiPlusCircle />
            <p>Add New</p>
          </a>
        </div>
      </div>
      {employeesQuery.isLoading && (
        <div className="w-full flex justify-center mt-8">
          <SyncLoader color="#199432" size={8} />
        </div>
      )}
      <div className="grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 justify-items-center mt-4">
        {employeesQuery.isSuccess &&
          employeesQuery.data.data.data.map(
            ({
              first_name,
              middle_name,
              last_name,
              id,
              mobile,
              image_is_set,
              job_title,
              city,
              image_url,
            }) => (
              <EmployeeCard
                firstName={first_name}
                lastName={last_name}
                middleName={middle_name}
                key={id}
                mobile={mobile}
                imageIsSet={image_is_set}
                jobTitle={job_title}
                city={city}
                id={id}
                imageUrl={image_url}
              />
            )
          )}
      </div>
    </div>
  );
};
export default Employees;
