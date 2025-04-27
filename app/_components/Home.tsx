import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import { useRef } from "react";

const Home: React.FC = () => {
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const scrollToHowItWorks = () => {
    if (howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* ✅ Pass the prop correctly */}
      <Hero scrollToHowItWorks={scrollToHowItWorks} />

      {/* Attach ref here */}
      <div ref={howItWorksRef}>
        <HowItWorks />
      </div>
    </div>
  );
};

export default Home;
