//importing hooks
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

//importing components
import Logo from "../../assets/logo.png";
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify";

//importing icons
import { RxDotFilled, RxDot } from "react-icons/rx";
import { MdClear } from "react-icons/md";
import { FiDelete } from "react-icons/fi";

//importing services
import { checkOut, verifyPin } from "../../api/attendance";

const CheckOut = () => {
  const [pin, setPin] = useState([]); //user code
  const navigate = useNavigate();
  const [checkoutCode, setCheckoutCode] = useState(""); //upated from db
  const updatePin = (number) => setPin((prev) => [...prev, number]);
  const deletePin = () => setPin(() => pin.slice(0, -1));
  const resetPin = () => setPin([]);
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const sessionId = search.get("sessionId");
  const userId = search.get("userId");
  const verifyPinQuery = useQuery({
    queryKey: ["PIN"],
    queryFn: () =>
      verifyPin({
        id: userId,
      }),
    onSuccess: (data) => {
      setCheckoutCode(data.data.data);
    },
  });
  const checkOutMutation = useMutation({
    mutationFn: () =>
      checkOut({
        sessionId: sessionId,
        checkOutTime: Date.now(),
        userId: userId,
      }),
    onSuccess: () => {
      navigate("/");
      toast.success("Successfully checked out.");
    },
  });
  useEffect(() => {
    if (pin.length === 4) {
      const code = pin.join("");
      //check accuracy
      if (code === checkoutCode) {
        checkOutMutation.mutate();
      } else {
        toast.error("Incorrect pin. Try again");
      }
      //reset pin
      resetPin();
    }
  }, [pin]);
  return (
    <div className="max-w-[95%] sm:max-w-[400px] mx-auto py-8 rounded-lg mt-8">
      <div className="w-full flex justify-center mt-8">
        <FadeLoader
          color="#199432"
          height={10}
          width={4}
          margin={-6}
          loading={verifyPinQuery.isLoading}
        />
      </div>
      {verifyPinQuery.isSuccess && (
        <div>
          <div className="mt-14">
            <img src={Logo} className="w-48 mx-auto" />
          </div>
          <div className="py-4">
            <div className="font-poppins text-sm text-gray-500 font-normal text-center">
              <div>4 digits pin to check out</div>
            </div>
            <div className="flex justify-center gap-2 w-full border mt-6 text-3xl text-gray-600 w-max mx-auto rounded-full">
              {pin.length >= 1 ? <RxDotFilled /> : <RxDot />}
              {pin.length >= 2 ? <RxDotFilled /> : <RxDot />}
              {pin.length >= 3 ? <RxDotFilled /> : <RxDot />}
              {pin.length >= 4 ? <RxDotFilled /> : <RxDot />}
            </div>
          </div>
          <div className="w-[95%] mx-auto grid grid-cols-3 justify-items-center gap-x-1 gap-y-6 mt-12">
            <div
              onClick={() => updatePin(1)}
              className="border-2 bg-gray-200 text-black font-semibold cursor-pointer w-14 h-14 rounded-full flex items-center justify-center hover:border-gray-400 hover:bg-gray-300 transition"
            >
              1
            </div>
            <div
              onClick={() => updatePin(2)}
              className="border-2 bg-gray-200 text-black font-semibold cursor-pointer w-14 h-14 rounded-full flex items-center justify-center hover:border-gray-400 hover:bg-gray-300 transition"
            >
              2
            </div>
            <div
              onClick={() => updatePin(3)}
              className="border-2 bg-gray-200 text-black font-semibold cursor-pointer w-14 h-14 rounded-full flex items-center justify-center hover:border-gray-400 hover:bg-gray-300 transition"
            >
              3
            </div>
            <div
              onClick={() => updatePin(4)}
              className="border-2 bg-gray-200 text-black font-semibold cursor-pointer w-14 h-14 rounded-full flex items-center justify-center hover:border-gray-400 hover:bg-gray-300 transition"
            >
              4
            </div>
            <div
              onClick={() => updatePin(5)}
              className="border-2 bg-gray-200 text-black font-semibold cursor-pointer w-14 h-14 rounded-full flex items-center justify-center hover:border-gray-400 hover:bg-gray-300 transition"
            >
              5
            </div>
            <div
              onClick={() => updatePin(6)}
              className="border-2 bg-gray-200 text-black font-semibold cursor-pointer w-14 h-14 rounded-full flex items-center justify-center hover:border-gray-400 hover:bg-gray-300 transition"
            >
              6
            </div>
            <div
              onClick={() => updatePin(7)}
              className="border-2 bg-gray-200 text-black font-semibold cursor-pointer w-14 h-14 rounded-full flex items-center justify-center hover:border-gray-400 hover:bg-gray-300 transition"
            >
              7
            </div>
            <div
              onClick={() => updatePin(8)}
              className="border-2 bg-gray-200 text-black font-semibold cursor-pointer w-14 h-14 rounded-full flex items-center justify-center hover:border-gray-400 hover:bg-gray-300 transition"
            >
              8
            </div>
            <div
              onClick={() => updatePin(9)}
              className="border-2 bg-gray-200 text-black font-semibold cursor-pointer w-14 h-14 rounded-full flex items-center justify-center hover:border-gray-400 hover:bg-gray-300 transition"
            >
              9
            </div>
            <div
              onClick={() => resetPin()}
              className="border-2 bg-gray-200 text-black font-semibold cursor-pointer w-14 h-14 rounded-full flex items-center justify-center hover:border-gray-400 hover:bg-gray-300 transition"
            >
              <MdClear />
            </div>
            <div
              onClick={() => updatePin(0)}
              className="border-2 bg-gray-200 text-black font-semibold cursor-pointer w-14 h-14 rounded-full flex items-center justify-center hover:border-gray-400 hover:bg-gray-300 transition"
            >
              0
            </div>
            <div
              onClick={() => deletePin()}
              className="border-2 bg-gray-200 text-black font-semibold cursor-pointer w-14 h-14 rounded-full flex items-center justify-center hover:border-gray-400 hover:bg-gray-300 transition"
            >
              <FiDelete />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CheckOut;
