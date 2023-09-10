//importing hooks
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//importing components
import { RoleCard } from "../../components";
import Backdrop from "../../components/backdrop";
import { FadeLoader } from "react-spinners";
import NewRole from "../new/role";

//importing icons
import { BiPlusCircle } from "react-icons/bi";

//importing services
import { fetchRoles } from "../../api/roles/";

const Roles = () => {
  const [showDropBack, setDropBack] = useState(false);
  const rolesQuery = useQuery({
    queryKey: ["ROLES"],
    queryFn: () => fetchRoles({}),
  });
  return (
    <div>
      <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between">
        <h2 className="font-poppins text-gray-700 md:text-lg whitespace-nowrap">
          Users
        </h2>
        <button
          onClick={() => setDropBack(true)}
          className="flex items-center gap-2 text-center bg-green-500 px-6 py-2 text-white text-sm rounded-lg hover:bg-green-600 transition w-full justify-center md:w-max"
        >
          <BiPlusCircle />
          <p>Add New</p>
        </button>
      </div>
      <div className="w-full flex justify-center mt-8">
        <FadeLoader
          color="#199432"
          height={10}
          width={4}
          margin={-6}
          loading={rolesQuery.isLoading}
        />
      </div>
      <div>
        {rolesQuery.isSuccess &&
          rolesQuery.data.data.data.map(({ name, id, is_admin }) => (
            <RoleCard name={name} id={id} key={id} isAdmin={is_admin} />
          ))}
      </div>
      <Backdrop
        children={<NewRole onClick={() => setDropBack(false)} />}
        display={showDropBack}
      />
    </div>
  );
};
export default Roles;
