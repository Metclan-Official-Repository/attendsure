//importing animation
import { motion, AnimatePresence } from "framer-motion";

const Backdrop = ({ children, display }) => {
  return (
    <AnimatePresence>
      {display && (
        <motion.div
          className="fixed h-screen w-screen bg-black top-0 left-0 z-10 overflow-y-auto"
          initial={{ backgroundColor: "rgba(0,0,0,0)" }}
          animate={{ backgroundColor: "rgba(0,0,0,.25)" }}
          transition={{ duration: 0.3 }}
          exit={{ backgroundColor: "rgba(0,0,0,0)" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Backdrop;
