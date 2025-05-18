import React from 'react';
import { assets } from '../../assets/assets';

const SearchBar = () => {
  const handleSearch = (e) => {
    e.preventDefault();
    // Add your search logic here
    console.log("Search submitted");
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for courses"
          className="w-full py-3 px-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
          aria-label="Search"
        >
          <img src={assets.search_icon} alt="Search" className="w-5 h-5" />
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
