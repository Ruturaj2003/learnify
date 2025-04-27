'use client';
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, SignUpButton, SignInButton } from '@clerk/nextjs';
import Header from './_components/Header';
import Hero from './_components/Hero';
import Features from './_components/Features';
import HowItWorks from './_components/HowItWorks';
import CTA from './_components/CTA';
import Footer from './_components/Footer';
const LandingPage = () => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const registerUser = async () => {
      if (!user) return;
      try {
        await axios.post('/api/user');
        console.log('User Added to DB');
      } catch (err) {
        console.log(err);
      }
    };

    if (isSignedIn) {
      registerUser();
      router.push('/dashboard'); // redirect to dashboard if logged in
    }
  }, [isSignedIn, user, router]);

  if (isSignedIn) return null; // avoid flicker while redirecting
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};
export default LandingPage;
