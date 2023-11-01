//import hooks
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

//import components
import { Footer } from "../../components";
import ContactSuccess from "./components/contact-success";
import Backdrop from "../../components/backdrop";

//import services
import { inquiryMail } from "../../api/mail";

const Contact = () => {
  const [contactBody, setContactBody] = useState({
    firstName: "",
    lastName: "",
    email: "",
    body: "",
  });
  const [activeField, setActiveField] = useState(null);
  const handleChange = (e) =>
    setContactBody((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleBlur = () => setActiveField(null);
  const handleFocus = (e) => setActiveField([e.target.name]);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const inquiryMutation = useMutation({
    mutationFn: () => inquiryMail(contactBody),
    onSuccess: () => {
      setContactBody({
        firstName: "",
        lastName: "",
        email: "",
        body: "",
      });
      setShowBackdrop(true);
    },
    onError: (err) => {
      console.log("the error is");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    inquiryMutation.mutate();
  };
  return (
    <section className="">
      <div className="w-[95%] mx-auto transition mt-20 flex flex-col gap-4 md:gap-6 md:flex-row md:justify-center">
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold text-black">
            Contact us
          </h3>
          <p className="text-sm mt-4 font-raleway font-semibold md:text-[16px] leading-6 transition">
            Need to get in touch with us? <br />
            To upgrade to pro account, feedback or make inquiry, <br />
            Either fill out the form with your inquiry or chat us on whatsapp.
            We respond within 1 hour.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="border px-6 py-4 rounded-lg w-full md:w-[500px] shadow-lg"
        >
          <div className="mt-2 flex gap-4 flex-col md:flex-row justify-between">
            <div className="flex flex-col flex-1">
              <label className="my-2">First name</label>
              <input
                type="text"
                name="firstName"
                className="bg-gray-200 px-4 py-3 rounded-sm transition w-full outline-none border-none"
                value={contactBody.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                required
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="my-2">Last name</label>
              <input
                type="text"
                name="lastName"
                className="bg-gray-200 px-4 py-3 rounded-sm transition w-full outline-none border-none"
                value={contactBody.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
            </div>
          </div>
          <div className="flex flex-col mt-1">
            <label className="my-2">Email</label>
            <input
              type="text"
              name="email"
              className="bg-gray-200 px-4 py-3 rounded-sm transition outline-none border-none"
              value={contactBody.email}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              required
            />
          </div>
          <div className="flex flex-col mt-1">
            <label className="my-2">Body</label>
            <textarea
              type="text"
              name="body"
              className="bg-gray-200 px-4 py-3 transition rounded-lg outline-none border-none"
              value={contactBody.body}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={5}
              onFocus={handleFocus}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className={
              "hover:bg-green-600 transition px-14 py-3 mt-8 text-white rounded-lg"
            }
            disabled={inquiryMutation.isLoading}
            style={{
              backgroundColor: inquiryMutation.isLoading
                ? "#86efac"
                : "#22c55e",
            }}
          >
            {inquiryMutation.isLoading ? "Submitting" : "Submit"}
          </button>
        </form>
      </div>
      <Backdrop
        children={<ContactSuccess onClick={() => setShowBackdrop(false)} />}
        display={showBackdrop}
      />
      <Footer />
    </section>
  );
};

export default Contact;
