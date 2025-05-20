import React from 'react';
import { assets } from '../../assets/assets';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by parent component through onSearchChange
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for courses"
          className="w-full py-3 px-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
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