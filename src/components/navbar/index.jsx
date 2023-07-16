//importing hooks
import { useState, useContext } from "react";

//importing icons
import { TiThMenu } from "react-icons/ti";
import { GrClose } from "react-icons/gr";

//importing logo
import Logo from "../../assets/Logo-no-bg.png";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const auth = localStorage.getItem("_token");
  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Employees", path: "/employees" },
    { name: "Departments", path: "/departments" },
    { name: "Shifts", path: "/shifts" },
    { name: "Attendance", path: "/attendance" },
    { name: "Settings", path: "/settings" },
  ];
  const handleLogout = () => {
    localStorage.removeItem("_token");
    window.location = "/";
  };
  return (
    <nav className="bg-gray-100 py-4">
      <div className="flex w-[95%] mx-auto justify-between gap-2 items-center">
        <a className="w-40 shrink-0" href="/">
          <img src={Logo} alt={"logo"} />
        </a>
        <ul className=" items-center gap-2 justify-between flex-1 hidden md:flex">
          <div className="flex items-center flex-1 justify-center">
            {links.map((link) => (
              <li className="inline-block" key={link.name}>
                <a
                  className="font-semibold text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg transition"
                  href={link.path}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </div>
          <li className="inline-block font-semibold text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg transition whitespace-nowrap">
            <button onClick={handleLogout}>
              {auth ? "Log out" : "Sign in"}
            </button>
          </li>
        </ul>
        <div className="relative">
          <div
            className="hover:bg-gray-200 px-4 py-2 rounded-lg transition text-xl text-gray-800 cursor-pointer md:hidden"
            onClick={() => setActive(!active)}
          >
            {active ? <GrClose /> : <TiThMenu />}
          </div>
          {active && (
            <div className="list-none absolute right-full top-10 bg-white border w-48 rounded-lg shadow px-4 py-8 z-10 flex flex-col gap-2 text-sm md:hidden">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    className="font-medium text-gray-600 hover:text-gray-900 hover:font-semibold"
                    href={link.path}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <button
                  className="font-medium text-gray-600 hover:text-gray-900 hover:font-semibold"
                  onClick={handleLogout}
                >
                  {auth ? "Log out" : "Sign in"}
                </button>
              </li>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
