"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center max-h-screen px-4">
      <div className={cn("flex items-center justify-center flex-col", headingFont.className)}>
        <h1
          className="text-4xl md:text-7xl text-center font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent relative inline-block"
          style={{
            backgroundSize: '200% auto',
            animation: 'gradientAnimation 5s linear infinite',
          }}
        >
          Welcome to Task-Mo
        </h1>

        <div className="text-3xl md:text-5xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-6 py-3 rounded-lg mb-6 inline-block shadow-md">
          Where vision meets collaboration.
        </div>
      </div>
    
      <div
        className={cn(
          "text-lg md:text-2xl font-bold text-gray-900 max-w-lg md:max-w-3xl text-center px-4 py-2",
          textFont.className
        )}
      >
        Power your team, streamline projects, and achieve more together.
      </div>

      <Button className="mt-8" size="lg">
        <Link href="/sign-up">Try it out!</Link>
      </Button>

      <style jsx>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default MarketingPage;
