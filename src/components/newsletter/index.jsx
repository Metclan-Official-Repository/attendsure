//import hooks
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

//import functions
import { toast } from "react-toastify";

//import icons
import { BsEnvelopeAtFill } from "react-icons/bs";

//import services
import { joinNewsLetter } from "../../api/newsletter";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const waitlistMutation = useMutation({
    mutationFn: () => joinNewsLetter({ email: email }),
    onSuccess: (data) => {
      const verificationId = data.data.data.newEmail._id;
      window.location.href = `https://twitter.com/intent/tweet?text=I%20just%20joined%20@quartexhq%20waitlist.%20Verification%20ID:%20${verificationId}.%20https://quartexhq.xyz`;
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
  const [activeField, setActiveField] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    waitlistMutation.mutate();
  };
  return (
    <section className="mt-20">
      <div className="bg-gradient-to-r from-green-800 to-green-500 to-green-400 py-10 md:py-20 px-4 mt-6 rounded-lg sm:px-12 md:mx-auto">
        <div>
          <h3 className="text-2xl font-medium md:text-4xl font-semibold text-white">
            Join the waitlist
          </h3>
          <p className="text-sm text-white mt-2">
            Stay in the loop with everything you need to know
          </p>
        </div>
        <div className="md:flex justify-between items-center">
          <div>
            <form className="mt-12" id={"waitlist"} onSubmit={handleSubmit}>
              <input
                name={"email"}
                value={email}
                placeholder={"Enter your email"}
                className={`w-full border-none outline-none px-4 py-3 rounded-lg placeholder:text-sm text-gray-700 border ${
                  activeField === "email" && "border-green-500"
                }`}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setActiveField("")}
                onFocus={() => setActiveField("email")}
                disabled={
                  waitlistMutation.isLoading || waitlistMutation.isSuccess
                }
              />
              <button
                className={`text-sm font-medium w-full text-center  mt-6 bg-white rounded-lg px-4 py-3 transition hover:bg-gradient-to-r from-green-800 to-green-500 to-green-400 border hover:border-white hover:text-white ${
                  waitlistMutation.isLoading &&
                  "cursor-not-allowed bg-gradient-to-r text-white"
                } ${
                  waitlistMutation.isSuccess &&
                  "cursor-not-allowed bg-gradient-to-r text-white"
                }`}
                disabled={
                  waitlistMutation.isLoading || waitlistMutation.isSuccess
                }
              >
                {waitlistMutation.isLoading
                  ? "Joining..."
                  : waitlistMutation.isError
                  ? "Join Waitlist"
                  : waitlistMutation.isSuccess
                  ? "Please wait..."
                  : "Join Waitlist"}
              </button>
            </form>
          </div>
          <div className="hidden md:block">
            <BsEnvelopeAtFill
              className={
                "text-[100px] text-gray-300 transform rotate-45 opacity-60"
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
