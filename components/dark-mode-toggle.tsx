"use client"
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"

export function DarkModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn( 
        "group relative flex items-center justify-center",
        theme === "dark" && "border border-white rounded-md"
      )}
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out ${
          theme === "dark"
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        } group-hover:rotate-180 group-hover:scale-125`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        } group-hover:-rotate-90 group-hover:scale-125`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}