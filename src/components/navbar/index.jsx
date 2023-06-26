import Logo from "../../assets/Logo-no-bg.png";
import { TiThMenu } from "react-icons/ti";
const Navbar = () => {
  return (
    <nav className="bg-gray-100 py-3">
      <div className="flex w-[95%] mx-auto justify-between gap-8 items-center">
        <a className="w-48 shrink-0" href="/">
          <img src={Logo} alt={"logo"} />
        </a>
        <ul className=" items-center gap-2 justify-between flex-1 hidden md:flex">
          <div className="flex items-center gap-8">
            <li className="inline-block font-semibold text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg transition">
              <a href="/">Dashboard</a>
            </li>
            <li className="inline-block font-semibold text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg transition">
              <a href="/departments">Departments</a>
            </li>
            <li className="inline-block font-semibold text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg transition">
              <a href="/employees">Employees</a>
            </li>
            <li className="inline-block font-semibold text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg transition">
              <a href="/attendance">Attendance</a>
            </li>
          </div>
          <li className="inline-block font-semibold text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg transition whitespace-nowrap">
            <a href="">Log out</a>
          </li>
        </ul>
        <div className="hover:bg-gray-200 px-4 py-2 rounded-lg transition text-xl text-gray-800 cursor-pointer md:hidden">
          <TiThMenu />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
