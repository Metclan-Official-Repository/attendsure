//importing hooks
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

//importing icons
import { BiPlusCircle } from "react-icons/bi";

//importing components
import Backdrop from "../../components/backdrop";
import NewLocation from "../new/location";
import { FadeLoader } from "react-spinners";
import { LocationsCard } from "../../components";
import { fetchLocations } from "../../api/locations";

const Locations = () => {
  const locationsQuery = useQuery({
    queryKey: ["LOCATIONS"],
    queryFn: () => fetchLocations(),
  });
  const [showDropBack, setDropBack] = useState(false);
  useEffect(() => {
    document.title = "Location settings";
  });
  return (
    <div>
      <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between">
        <h2 className="font-poppins text-gray-700 md:text-lg whitespace-nowrap">
          Business Locations
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
          loading={locationsQuery.isLoading}
        />
      </div>
      <div className="mt-8">
        {locationsQuery.isSuccess &&
          locationsQuery.data.data.data.map(
            ({ id, name, address, location_unique_name, is_active }) => (
              <LocationsCard
                name={name}
                address={address}
                uniqueName={location_unique_name}
                isActive={is_active}
                key={id}
                id={id}
              />
            )
          )}
      </div>
      <Backdrop
        children={<NewLocation onClick={() => setDropBack(false)} />}
        display={showDropBack}
      />
    </div>
  );
};

export default Locations;
