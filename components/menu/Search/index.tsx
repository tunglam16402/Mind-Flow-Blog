import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchProps {
  scrolled?: boolean;
}

const Search: React.FC<SearchProps> = ({ scrolled }) => {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showInput) {
      inputRef.current?.focus();
    }
  }, [showInput]);

  return (
    <div className="relative hidden md:flex">
      <button
        onClick={() => setShowInput(!showInput)}
        className={clsx(
          "transition-colors duration-300",
          scrolled
            ? "text-primary  hover:text-blue-600"
            : "sub-text hover:white-text"
        )}
      >
        <FaSearch className="w-6 h-6" />
      </button>

      {showInput && (
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className={clsx(
            "absolute right-0 mt-2 px-3 py-1 rounded-md border outline-none text-sm transition-all duration-300",
            scrolled
              ? "bg-white text-primary  border-gray-300 placeholder-gray-400"
              : "bg-white/20 white-text placeholder-white/60 border-white/30"
          )}
        />
      )}
    </div>
  );
};

export default Search;
