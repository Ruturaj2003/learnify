"use client";

import axios from "axios";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import HowItWorks from "./_components/HowItWorks";
import CTA from "./_components/CTA";
import Footer from "./_components/Footer";

const LandingPage = () => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const howItWorksRef = useRef<HTMLDivElement>(null); // ✅

  useEffect(() => {
    const registerUser = async () => {
      if (!user) return;
      try {
        await axios.post("/api/user");
        console.log("User Added to DB");
      } catch (err) {
        console.log(err);
      }
    };

    if (isSignedIn) {
      registerUser();
      router.push("/dashboard");
    }
  }, [isSignedIn, user, router]);

  const scrollToHowItWorks = () => {
    // ✅
    if (howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isSignedIn) return null;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero scrollToHowItWorks={scrollToHowItWorks} />{" "}
        {/* ✅ pass the prop */}
        <Features />
        <div ref={howItWorksRef}>
          {" "}
          {/* ✅ wrap HowItWorks with the ref */}
          <HowItWorks />
        </div>
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
