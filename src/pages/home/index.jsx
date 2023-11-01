// import components
import {
  Hero,
  Feature,
  Testimonials,
  NewsLetter,
  Footer,
} from "../../components";

const Home = () => {
  return (
    <div>
      <div className="w-[95%] mx-auto transition">
        <Hero />
        <Feature />
        {/* <Testimonials /> */}
        <NewsLetter />
      </div>
      <Footer />
    </div>
  );
};
export default Home;
