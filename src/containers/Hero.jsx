// React Util
import React from "react";

// JSX Components
import SearchSchool from "./SearchSchool";

const Hero = () => {
  return (
    <div className="h-screen w-full bg-background text-text flex items-center justify-center">
      <div className="flex flex-col gap-5 max-w-[1000px] bg-white/10 px-4">
        <div className="flex flex-col text-center max-w-[600px]">
          <h2 className="text-3xl font-poppins font-semibold">
            Dale una segunda vida a los libros escolares
          </h2>
        </div>
        <SearchSchool />
      </div>
    </div>
  );
};

export default Hero;
