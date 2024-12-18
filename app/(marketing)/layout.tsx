import React from "react";
import { Navbar } from "./_components/navbar";

const MainLayOut = ({ children }: { children: React.ReactNode }) => {
  const backgroundStyle = {
    backgroundImage: "url('/bg-img-landing-page-2.png')",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover", 
    height: "100vh", 
  
  };
  return (
    <div style={backgroundStyle} className="h-full">
      <Navbar />
      <main className="pt-40">{children}</main>
    </div>
  );
};
export default MainLayOut;
