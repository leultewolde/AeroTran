import React from 'react';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBar = () => {
  return (
    <div className="flex">
      <div className="mb-3 xl:w-96">
        <div className="input-group relative flex flex-wrap items-stretch w-full mb-4 shadow-sm rounded-full">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute z-10 text-sky-500 top-3.5 left-4"
          />
          <input
            type="search"
            className="form-control relative flex-auto min-w-0 block w-full pl-11 pr-3 py-2.5 text-base font-normal text-gray-700 bg-white bg-clip-padding rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Pesquisar"
            aria-label="Search"
            aria-describedby="button-addon2"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
