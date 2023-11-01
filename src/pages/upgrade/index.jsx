//import functions
import { motion } from "framer-motion";

//import components
import { GrClose } from "react-icons/gr";

const Upgrade = ({ onClick, message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 250 }}
      exit={{ opacity: 0, y: 100 }}
    >
      <div className="bg-white w-[90%] mx-auto mt-[200px] max-w-[500px] rounded-lg relative p-6">
        <GrClose
          className="bg-white absolute top-[-5%] right-[-2%] text-4xl p-2 rounded-full text-gray-500 hover:text-gray-900 cursor-pointer hover:bg-gray-100"
          onClick={onClick}
        />
        <h1 className="text-center text-3xl font-bold">Get Premium</h1>
        <p className="mt-5 text-[18px] text-center">{message}</p>
        <div className="flex justify-center items-center mt-8">
          <a
            href="/contact"
            className="bg-blue-500 px-8 py-2 rounded-full text-white hover:scale-105 transition hover:bg-blue-600 border-2 hover:border-blue-800 hover:shadow"
          >
            Upgrade
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Upgrade;
