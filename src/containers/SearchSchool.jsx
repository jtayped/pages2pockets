// React Util
import React from "react";

// Icons
import { BsSend, BsSearch } from "react-icons/bs";

const SearchSchool = () => {
  function search(event) {
    event.preventDefault();
  }

  return (
    <form
      onSubmit={(e) => search(e)}
      className="flex justify-between p-1.5 w-full backdrop-blur-sm border-2 border-primary rounded-lg text-text pl-3"
    >
      <div className="flex items-center gap-2 w-full pr-2">
        <BsSearch size={23} />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-lg w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-primary flex items-center justify-center p-2 rounded"
      >
        <BsSend size={22} />
      </button>
    </form>
  );
};

export default SearchSchool;
