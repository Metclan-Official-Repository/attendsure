//importing hooks
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//importing icons
import { BiPlusCircle } from "react-icons/bi";

//importing function
import { checkRole } from "../../helper";
//importing components
import { UserCards } from "../../components";
import Backdrop from "../../components/backdrop";
import NewUser from "../new/user";

//importing services
import { fetchUsers } from "../../api/users";
const Users = () => {
  const [showDropBack, setDropBack] = useState(false);
  const userQuery = useQuery({
    queryKey: ["USERS"],
    queryFn: () => fetchUsers(),
  });
  return (
    <div>
      <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between">
        <h2 className="font-poppins text-gray-700 md:text-lg whitespace-nowrap">
          Users
        </h2>
        {checkRole("users.new") && (
          <button
            onClick={() => setDropBack(true)}
            className="flex items-center gap-2 text-center bg-green-500 px-6 py-2 text-white text-sm rounded-lg hover:bg-green-600 transition w-full justify-center md:w-max"
          >
            <BiPlusCircle />
            <p>Add New</p>
          </button>
        )}
      </div>
      <div className="mt-6">
        {userQuery.isSuccess &&
          userQuery.data.data.data.map(
            ({ first_name, last_name, id, name }) => (
              <UserCards
                firstName={first_name}
                lastName={last_name}
                roleName={name}
                id={id}
                key={id}
              />
            )
          )}
      </div>

      <Backdrop
        children={<NewUser onClick={() => setDropBack(false)} />}
        display={showDropBack}
      />
    </div>
  );
};
export default Users;
