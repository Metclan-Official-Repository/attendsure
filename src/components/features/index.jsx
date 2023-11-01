import Feature1 from "../../assets/feature-1.png";
import Feature2 from "../../assets/feature-2.png";
const Features = () => {
  return (
    <div className="mt-28 md:w-[80%] mx-auto">
      <div>
        <div className="rounded-2xl flex flex-col md:flex-row justify-center gap-8 md:gap-4">
          <div className="w-full md:w-[50%]">
            <h3 className="text-3xl font-semibold text-black">
              Record and Track Shifts Seamlessly
            </h3>
            <p className="text-sm mt-4 font-raleway font-semibold md:text-[16px] leading-6 transition">
              AttendSure gives you the flexibility to track work shifts
              seamlessly, ensuring precise and efficient workforce management
              tailored to your business needs
            </p>
          </div>
          <div className="border-2 w-full md:w-[50%] overflow-hidden rounded-xl shadow">
            <img src={Feature1} />
          </div>
        </div>
      </div>
      <div>
        <div className="rounded-2xl flex flex-col md:flex-row justify-center gap-8 md:gap-4 mt-24">
          <div className="border-2 border-green w-full md:w-[50%] overflow-hidden rounded-xl shadow">
            <img src={Feature2} />
          </div>
          <div className="w-full md:w-[50%]">
            <h3 className="text-2xl md:text-3xl font-semibold text-black">
              Pinpoint Precision at Your Fingertips
            </h3>
            <p className="text-sm mt-4 font-raleway font-semibold md:text-[16px] leading-6 transition">
              With AttendSure, simplicity meets security. Our innovative PIN
              check-in feature empowers users to effortlessly mark their
              presence with a personal touch. Enter your unique PIN, unlock
              convenience, and ensure accurate attendance tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Features;
