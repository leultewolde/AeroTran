import React from 'react';

import {
  faChartPie,
  faFileCirclePlus,
  faGlasses,
  faUsers,
  faSackDollar,
  faUserShield,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SideBar = () => {
  return (
    <>
      <div className="w-60 h-screen" />
      <div className="fixed top-0 shadow-2xl w-60 bg-white shadow md:h-screen flex-col justify-between flex">
        <div className="px-8">
          <div className="h-16 w-full flex items-center my-12">
            <div className="m-auto">
              <h1 className="text-5xl text-slate-600 font-semibold">LOGO</h1>
            </div>
          </div>
          <ul className="mt-16">
            <li className="flex w-full justify-between font-semibold text-sky-500 hover:text-sky-400 cursor-pointer items-center mb-8">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faChartPie} className="w-8 mr-4" />
                <span className="text-md  ml-2">Dashboard</span>
              </div>
            </li>
            <li className="flex w-full justify-between font-semibold text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-8">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faFileCirclePlus} className="w-8 mr-4" />
                <span className="text-md  ml-2">Pedidos</span>
              </div>
            </li>
            <li className="flex w-full justify-between font-semibold text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-8">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faGlasses} className="w-8 mr-4" />
                <span className="text-md  ml-2">Produtos</span>
              </div>
            </li>
            <li className="flex w-full justify-between font-semibold text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-8">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUsers} className="w-8 mr-4" />
                <span className="text-md  ml-2">Clientes</span>
              </div>
            </li>
            <li className="flex w-full justify-between font-semibold text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-8">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faSackDollar} className="w-8 mr-4" />
                <span className="text-md  ml-2">Financeiro</span>
              </div>
            </li>
            <li className="flex w-full justify-between font-semibold text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-8">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUserShield} className="w-8 mr-4" />
                <span className="text-md ml-2">Usuários</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="ml-8">
          <div className="flex w-full justify-between font-semibold text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-8">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="w-8 mr-4"
              />
              <span className="text-md">Logout</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
