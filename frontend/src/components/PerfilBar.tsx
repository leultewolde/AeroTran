import React from 'react';
import { faker } from '@faker-js/faker';

import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

const PerfilBar = () => {
  return (
    <div className="flex">
      <div className="relative left-12 top-0.5 bg-sky-500 text-white text-xs h-5 w-5 text-center rounded-full border-2 border-solid border-gray-50">
        9
      </div>
      <FontAwesomeIcon
        icon={faBell}
        className="w-7 h-7 mx-4 mt-2 text-gray-400 hover:text-sky-500"
      />
      <div className="rounded-full border-2 border-solid border-gray-300 h-11">
        <Image
          className="rounded-full"
          width={40}
          height={40}
          src={faker.image.avatar()}
          alt="Profile image"
        />
      </div>
    </div>
  );
};

export default PerfilBar;
