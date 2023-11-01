//import functions
import { motion } from "framer-motion";
//import components
import { GrClose } from "react-icons/gr";

const ContactSuccess = ({ onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 250 }}
      exit={{ opacity: 0, y: 100 }}
    >
      <div className="bg-white w-[90%] mx-auto mt-[100px] max-w-[400px] rounded-lg relative py-20">
        <GrClose
          className="bg-white absolute top-[-5%] right-[-2%] text-4xl p-2 rounded-full text-gray-500 hover:text-gray-900 cursor-pointer hover:bg-gray-100"
          onClick={onClick}
        />

        <div class="success-animation mb-20">
          <svg
            class="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              class="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              class="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        <div className="">
          <h4 className="text-2xl text-center text-black">Thank you</h4>
          <p className="text-sm text-center text-black">
            Your mail was sent successfully
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactSuccess;
