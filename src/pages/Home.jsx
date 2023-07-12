// React Util
import React from "react";

// JSX Components
import { Hero } from "../containers";

const Home = () => {
  return (
    <div className="bg-background font-poppins">
      <header className="flex flex-col">
        <Hero />
      </header>
    </div>
  );
};

export default Home;
