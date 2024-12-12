import React from 'react';

import {
  faStore,
  faUserPlus,
  faMoneyBillTrendUp,
  faPiggyBank,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StatusCards = () => {
  return (
    <div className="flex justify-between mt-2 mb-6">
      <div className="bg-white shadow-sm rounded-xl mr-8 w-full h-24 flex">
        <FontAwesomeIcon
          icon={faStore}
          className="w-12 h-12 text-sky-500 mt-6 mx-6"
        />
        <div className="flex flex-col justify-center">
          <span className="text-gray-700 font-semibold">
            Unidades Registradas
          </span>
          <span className="text-sky-500 text-lg">1</span>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-xl mr-8 w-full h-24 flex">
        <FontAwesomeIcon
          icon={faUserPlus}
          className="w-12 h-12 text-sky-500 mt-6 mx-6"
        />
        <div className="flex flex-col justify-center">
          <span className="text-gray-700 font-semibold">Novos Clientes</span>
          <span className="text-sky-500 text-lg">104</span>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-xl mr-8 w-full h-24 flex">
        <FontAwesomeIcon
          icon={faMoneyBillTrendUp}
          className="w-12 h-12 text-sky-500 mt-6 mx-6"
        />
        <div className="flex flex-col justify-center">
          <span className="text-gray-700 font-semibold">Vendas Realizadas</span>
          <span className="text-sky-500 text-lg">7270</span>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-xl w-full h-24 flex">
        <FontAwesomeIcon
          icon={faPiggyBank}
          className="w-12 h-12 text-sky-500 mt-6 mx-6"
        />
        <div className="flex flex-col justify-center">
          <span className="text-gray-700 font-semibold">
            Lucro Liquido (Geral)
          </span>
          <span className="text-sky-500 text-lg">R$ 427.300,50</span>
        </div>
      </div>
    </div>
  );
};

export default StatusCards;
