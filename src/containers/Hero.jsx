// React Util
import React from "react";

// JSX Components
import SearchSchool from "./SearchSchool";

// Images
import Default from "../assets/images/branding/default.png";

const Hero = () => {
  return (
    <div className="h-screen w-full bg-background text-text flex items-center justify-center">
      <div className="flex flex-col gap-5 max-w-[550px] bg-white/10 px-4">
        <div className="flex flex-col text-center">
          <img src={Default} className="h-[80px] object-cover" alt="" />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem
            recusandae accusantium minus consectetur veniam ad nesciunt
            consequuntur aspernatur voluptas dolorem?
          </p>
        </div>
        <SearchSchool />
      </div>

      <div className="absolute z-[1] w-[35%] h-[35%] right-0 bottom-0 bg-secondary-button blur-[300px]" />
      <div className="absolute z-[1] w-[35%] h-[35%] top-0 left-0 bg-primary-button blur-[200px]" />
    </div>
  );
};

export default Hero;
