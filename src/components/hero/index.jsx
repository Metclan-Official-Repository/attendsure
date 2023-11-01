const Hero = () => {
  return (
    <div className="mt-28 flex flex-col items-center md:max-w-[80%] mx-auto border-b">
      <h1 className="text-4xl font-bold text-center text-black sm:text-6xl transition">
        Time is <span className="text-green-600">money</span>, save and{" "}
        <span className="text-green-600">optimize</span> both with{" "}
        <span className="relative">
          attend
          <svg
            aria-hidden="true"
            viewBox="0 0 281 40"
            className="absolute fill-blue-400 bottom-[-10%] w-[80%] right-0"
            preserveAspectRatio="true"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M240.172 22.994c-8.007 1.246-15.477 2.23-31.26 4.114-18.506 2.21-26.323 2.977-34.487 3.386-2.971.149-3.727.324-6.566 1.523-15.124 6.388-43.775 9.404-69.425 7.31-26.207-2.14-50.986-7.103-78-15.624C10.912 20.7.988 16.143.734 14.657c-.066-.381.043-.344 1.324.456 10.423 6.506 49.649 16.322 77.8 19.468 23.708 2.65 38.249 2.95 55.821 1.156 9.407-.962 24.451-3.773 25.101-4.692.074-.104.053-.155-.058-.135-1.062.195-13.863-.271-18.848-.687-16.681-1.389-28.722-4.345-38.142-9.364-15.294-8.15-7.298-19.232 14.802-20.514 16.095-.934 32.793 1.517 47.423 6.96 13.524 5.033 17.942 12.326 11.463 18.922l-.859.874.697-.006c2.681-.026 15.304-1.302 29.208-2.953 25.845-3.07 35.659-4.519 54.027-7.978 9.863-1.858 11.021-2.048 13.055-2.145a61.901 61.901 0 0 0 4.506-.417c1.891-.259 2.151-.267 1.543-.047-.402.145-2.33.913-4.285 1.707-4.635 1.882-5.202 2.07-8.736 2.903-3.414.805-19.773 3.797-26.404 4.829Zm40.321-9.93c.1-.066.231-.085.29-.041.059.043-.024.096-.183.119-.177.024-.219-.007-.107-.079ZM172.299 26.22c9.364-6.058 5.161-12.039-12.304-17.51-11.656-3.653-23.145-5.47-35.243-5.576-22.552-.198-33.577 7.462-21.321 14.814 12.012 7.205 32.994 10.557 61.531 9.831 4.563-.116 5.372-.288 7.337-1.559Z"
            ></path>
          </svg>
          <span className="text-green-600">sure</span>
        </span>
      </h1>
      <p className="text-sm mt-8 text-center font-raleway font-semibold md:text-[16px] leading-6 transition">
        Transforming Time into Productivity: Innovating Attendance Management
        for a Smarter Tomorrow. Where Efficiency Meets Precision, Your Success
        Begins. Experience the Future of Timekeeping with our attendance
        management system.
      </p>
      <div className="my-10 w-full flex flex-col items-center">
        <a
          href="/signup"
          className="bg-green-600 rounded-full text-white font-semibold w-[90%] h-[45px] transition hover:scale-105 md:h-[50px] md:w-[250px] flex items-center gap-4 justify-center text-[16px] [&>*:last-child]:hover:block hover:text-white"
        >
          <span className="transition">Start free trial</span>
        </a>
        <span className="text-xs mt-4">No credit card required</span>
      </div>
    </div>
  );
};
export default Hero;
