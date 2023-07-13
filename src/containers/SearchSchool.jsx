// React Util
import React from "react";

// Icons
import { BsSend, BsSearch } from "react-icons/bs";

const SearchSchool = () => {
  function search(event) {
    event.preventDefault();
  }

  return (
    <form className="flex items-center gap-3" onSubmit={(e) => search(e)}>
      <div className="flex items-center gap-3 w-full border px-4 py-2 rounded-full border-black/60">
        <BsSearch size={20} />
        <input
          className="w-full bg-transparent outline-none"
          type="text"
          placeholder="Busca tu escuela"
        />
      </div>
      <button className="bg-accent px-4 py-2 rounded-full font-semibold text-white">
        Buscar
      </button>
    </form>
  );
};

export default SearchSchool;
