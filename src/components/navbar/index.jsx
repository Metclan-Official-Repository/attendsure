//importing hooks
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

//importing icons
import { TiThMenu } from "react-icons/ti";
import { GrClose } from "react-icons/gr";

//importing contants
import { navLinks, guestNav } from "../../constants";

//importing logo
import Logo from "../../assets/Logo-no-bg.png";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [links, setLinks] = useState([]);
  const auth = localStorage.getItem("_token");
  const handleLogout = () => {
    localStorage.removeItem("_token");
    window.location = "/login";
  };
  useEffect(() => {
    if (auth) {
      const decodedToken = jwt_decode(auth);
      const roles = decodedToken._roles;
      if (decodedToken._isAdmin) {
        setLinks(navLinks);
      } else {
        const userLinks = navLinks.filter(({ key }) => {
          return roles.find(({ name }) => {
            return name === key;
          });
        });
        setLinks(userLinks);
      }
    } else {
      setLinks(guestNav);
    }
  }, [auth]);
  return (
    <nav className="py-4 border-b">
      <div className="flex w-[95%] mx-auto justify-between gap-2 items-center">
        <a
          href="/"
          className="text-xl sm:text-2xl text-green-600 font-bold transition hover:text-green-600"
        >
          Attend<span className="text-black ">Sure</span>
        </a>
        <ul className=" items-center gap-2 justify-center flex-1 hidden md:flex">
          <div className="flex items-center flex-1 justify-end">
            {links.map((link) => (
              <li className="inline-block" key={link.name}>
                <a
                  className="font-semibold text-black hover:text-gray-600 px-4 py-2 rounded-lg transition font-raleway"
                  href={link.path}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </div>
          <li className="inline-block font-semibold text-white bg-black py-2 rounded-lg transition whitespace-nowrap px-4">
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
