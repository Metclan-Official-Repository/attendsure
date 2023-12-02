//import hooks
import { useMutation } from "@tanstack/react-query";
//import services
import { editEmployeeFingerprint } from "../../api/employees";

//import icons
import { RiFingerprint2Fill } from "react-icons/ri";
import { MdOutlinePassword } from "react-icons/md";
import { IoQrCode } from "react-icons/io5";
import Toggle from "react-toggle";

const EmployeeSecurity = () => {
  const employeeFingerprintMutation = useMutation({
    mutationFn: editEmployeeFingerprint({}),
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-2">
      {/* Contact information */}
      <div className="flex-1">
        <div className="flex items-center mt-8 gap-2">
          <div className="text-black font-medium text-[18px] whitespace-nowrap">
            CHECK-IN OPTIONS
          </div>
          <div className="w-full h-[1.5px] bg-gray-200"></div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1 flex-1">
            <MdOutlinePassword className="" />
            <h4 className="text">PIN CODE</h4>
          </div>
          <div className="flex-1">
            <div className="px-4 py-2 text-xs bg-blue-500 inline-block text-white cursor-pointer rounded-[5px] hover:bg-blue-600 transition">
              RESET PIN
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1 flex-1">
            <RiFingerprint2Fill className="" />
            <h4 className="text">ENABLE FINGERPRINT</h4>
          </div>
          <div className="flex-1">
            <div className="px-4 py-2 inline-block text-white cursor-pointer rounded-[5px] transition">
              <Toggle
                value={""}
                // onChange={() =>
                //   setEmployeeInfo((prev) => ({
                //     ...prev,
                //     qrCodeEnabled: prev.qrCodeEnabled ? 0 : 1,
                //   }))
                // }
                disabled={false}
                checked={false}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1 flex-1">
            <IoQrCode className="" />
            <h4 className="text">QR CODE</h4>
          </div>
          <div className="flex-1">
            <div className="px-4 py-2 inline-block text-white cursor-pointer rounded-[5px] transition">
              <Toggle
                value={""}
                // onChange={() =>
                //   setEmployeeInfo((prev) => ({
                //     ...prev,
                //     qrCodeEnabled: prev.qrCodeEnabled ? 0 : 1,
                //   }))
                // }
                disabled={false}
                checked={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmployeeSecurity;
