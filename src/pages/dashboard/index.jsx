//importing hooks
import { useQuery } from "@tanstack/react-query";
//importing components
import { AttendanceCard } from "../../components";
import { FadeLoader } from "react-spinners";
import { OverviewCards } from "../../components";

//importing services
import { fetchEmployee } from "../../api/employees";

const Dashboard = () => {
  const employeesQuery = useQuery({
    queryKey: ["EMPLOYEES"],
    queryFn: () => fetchEmployee(),
    refetchOnWindowFocus: false,
  });
  return (
    <div className="mt-4 w-[95%] mx-auto">
      <div className="mt-4">
        <div className="w-16 h-1 bg-blue-400"></div>
        <h4 className="text-xl font-medium text-gray-600">Dashboard</h4>
      </div>
      <OverviewCards />
      <div className="w-full flex justify-center mt-8">
        <FadeLoader
          color="#199432"
          height={10}
          width={4}
          margin={-6}
          loading={employeesQuery.isLoading}
        />
      </div>
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
              is_checkedin,
              session_id,
              image_url,
            }) => (
              <AttendanceCard
                firstName={first_name}
                lastName={last_name}
                middleName={middle_name}
                key={id}
                mobile={mobile}
                imageIsSet={image_is_set}
                jobTitle={job_title}
                city={city}
                id={id}
                isCheckedIn={is_checkedin}
                sessionId={session_id}
                imageUrl={image_url}
              />
            )
          )}
      </div>
    </div>
  );
};
export default Dashboard;
