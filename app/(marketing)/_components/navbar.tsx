"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
export const Navbar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div
      className={cn(
        "fixed top-0 w-full p-4 border-t backdrop-filter backdrop-blur-xl",
        theme === "dark" ? "bg-gray-800" : "bg-gray-100"
      )}
    >
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <DarkModeToggle />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button
            size="sm"
            variant="outline"
            asChild
            className={cn(
              theme === "dark" && "border border-white"
            )}
          >
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button
            size="sm"
            asChild
            className={cn(
              theme === "dark" && "border border-white"
            )}
          >
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
