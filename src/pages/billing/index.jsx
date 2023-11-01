//import icons
import { BiSolidCheckSquare } from "react-icons/bi";
const Billing = () => {
  return (
    <div>
      <div>
        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between">
          <h2 className="font-poppins text-gray-700 md:text-lg whitespace-nowrap">
            Business Locations
          </h2>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
        <div className="px-8">
          <ul className="flex flex-col gap-4">
            <li className="flex items-center text-[16px] text-black gap-2">
              <BiSolidCheckSquare className="text-xl text-green-600" />
              <p>10 Employees</p>
            </li>
            <li className="flex items-center text-[16px] text-black gap-2">
              <BiSolidCheckSquare className="text-xl text-green-600" />
              <p>2 Business locations</p>
            </li>
            <li className="flex items-center text-[16px] text-black gap-2">
              <BiSolidCheckSquare className="text-xl text-green-600" />
              <p>5 Users </p>
            </li>
            <li className="flex items-center text-[16px] text-black gap-2">
              <BiSolidCheckSquare className="text-xl text-green-600" />
              <p>Multiple Roles </p>
            </li>
          </ul>
        </div>
        <div className="border w-[250px] shadow bg-green-500 rounded-lg text-white p-4 flex flex-col gap-2 h-max">
          <p className="text-sm">Your plan</p>
          <h4 className="text-3xl font-semibold">FREE</h4>
          <p>Gives you limited access</p>
          <a
            className="border border-white px-2 py-2 text-center rounded-full hover:text-black transition hover:bg-white"
            href="/contact"
          >
            Upgrade
          </a>
        </div>
      </div>
    </div>
  );
};

export default Billing;
