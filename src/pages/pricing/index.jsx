//import components
import { Footer, NewsLetter } from "../../components";

//import icons
import { BiSolidCheckSquare } from "react-icons/bi";
const Pricing = () => {
  return (
    <div className="">
      <div className="w-[95%] mx-auto transition mt-20">
        <div className="mb-10">
          <h1 className="text-center text-4xl font-bold text-black">
            Pricing Plan
          </h1>
          <p className="text-center mt-2 text-sm md:text-[17px]">
            Get unlimited access to all the advanced features we have to offer{" "}
          </p>
        </div>
        <div className="w-full sm:w-[450px] bg-gray-100 rounded-lg mx-auto overflow-hidden pb-10">
          <div className="bg-green-600 text-white py-2 px-4 text-center text-[18px]">
            Early Bird Discount
          </div>
          <div className="px-8 mb-10 text-center text-[18px] text-gray-800 mt-10">
            Pay now, access pro features
          </div>
          <div className="px-8">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center text-[16px] text-black gap-2">
                <BiSolidCheckSquare className="text-xl text-green-600" />
                <p>Unlimited Employees</p>
              </li>
              <li className="flex items-center text-[16px] text-black gap-2">
                <BiSolidCheckSquare className="text-xl text-green-600" />
                <p>Unlimited Business locations</p>
              </li>
              <li className="flex items-center text-[16px] text-black gap-2">
                <BiSolidCheckSquare className="text-xl text-green-600" />
                <p>Unlimited Users </p>
              </li>
              <li className="flex items-center text-[16px] text-black gap-2">
                <BiSolidCheckSquare className="text-xl text-green-600" />
                <p>Multiple Roles </p>
              </li>
              <li className="flex items-center text-[16px] text-black gap-2">
                <BiSolidCheckSquare className="text-xl text-green-600" />
                <p>Fingerprint Checkin </p>
              </li>
              <li className="flex items-center text-[16px] text-black gap-2">
                <BiSolidCheckSquare className="text-xl text-green-600" />
                <p>QR Code Checkin </p>
              </li>
            </ul>
            <div>
              <h4 className="text-4xl font-bold text-black text-center mt-8">
                $4.99/<span className="font-medium text-2xl">month</span>
              </h4>
              <h4 className="text-xl font-bold text-black text-center mt-2">
                <s>$10/month</s>
              </h4>
              <h4 className="text-sm font-normal text-gray-800 text-center mt-2">
                USD
              </h4>
            </div>
            <div className="flex justify-center mt-20">
              <a
                href="/"
                className="bg-blue-500 text-white text-center px-8 py-3 inline-block w-[90%] rounded-lg hover:text-white hover:bg-blue-600 transition font-semibold text-xl"
              >
                Go Pro
              </a>
            </div>
          </div>
        </div>
        <NewsLetter />
      </div>
      <Footer />
    </div>
  );
};
export default Pricing;
