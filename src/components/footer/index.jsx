import { useEffect, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
const Footer = () => {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="mt-20 bg-gray-100 flex flex-col justify-center">
      <div className=" flex flex-col gap-4 md:flex-row md:justify-between w-[95%] mx-auto transition py-10">
        <div className="">
          <a
            href="/"
            className="text-xl sm:text-2xl text-green-600 font-bold transition hover:text-green-600"
          >
            Attend<span className="text-black ">Sure</span>
          </a>
          <ul className="flex flex-col gap-2 mt-8">
            <li>
              <a
                href="/"
                className="text-gray-800 text-[16px] hover:text-green-800"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="https://attendsure.featurebase.app/"
                target="_blank"
                className="text-gray-800 text-[16px] hover:text-green-800"
              >
                Feedback
              </a>
            </li>
            <li>
              <a
                href="/pricing"
                className="text-gray-800 text-[16px] hover:text-green-800"
              >
                Pricing
              </a>
            </li>
          </ul>
        </div>
        <div className="">
          <h3 className="text-2xl md:text-2xl font-semibold text-green-600 mb-4">
            Tick, <span className="text-black">tock</span>
          </h3>
          <Clock value={value} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
