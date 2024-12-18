import React from 'react';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBar = () => {
  return (
      <div className="flex justify-center items-center">
        <div className="flex gap-4 w-full max-w-4xl items-center">
          {/* Departure City Input */}
          <div className="relative w-full">
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute z-10 text-sky-500 top-3.5 left-4"
            />
            <input
                type="search"
                className="form-control relative flex-auto min-w-0 block w-full pl-11 pr-3 py-2.5 text-base font-normal text-gray-700 bg-white bg-clip-padding rounded-full transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-sm"
                placeholder="Departure City"
                aria-label="Search"
            />
          </div>

          {/* Destination City Input */}
          <div className="relative w-full">
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute z-10 text-sky-500 top-3.5 left-4"
            />
            <input
                type="search"
                className="form-control relative flex-auto min-w-0 block w-full pl-11 pr-3 py-2.5 text-base font-normal text-gray-700 bg-white bg-clip-padding rounded-full transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-sm"
                placeholder="Destination City"
                aria-label="Search"
            />
          </div>

          {/* Search Button */}
          <button
              className="px-6 py-2.5 bg-sky-500 text-white font-medium text-base leading-tight uppercase rounded-full shadow-md hover:bg-sky-600 hover:shadow-lg focus:bg-sky-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-700 active:shadow-lg transition duration-150 ease-in-out"
              onClick={() => alert("Searching flights...")}
          >
            Search
          </button>
        </div>
      </div>
  );
};

export default SearchBar;
