import React, { useState } from 'react';

import lastOrdersData from '@/data/lastOrders';
import SideBar from '@/components/SideBar';
import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import PerfilBar from '@/components/PerfilBar';
import StatusCards from '@/components/StatusCards';

function Index() {
  const [lastOrders] = useState([...lastOrdersData]);

  return (
    <div className="flex flex-no-wrap bg-slate-50">
      <SideBar />
      <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
        <div className="w-full flex justify-between">
          <SearchBar />
          <PerfilBar />
        </div>
        <StatusCards />
        <div className="mb-8 w-full h-64 rounded border-dashed border-2 border-gray-300" />
        <div className="font-semibold text-gray-700 shadow-md p-6 border-x bg-white border-t border-gray-100 rounded-t-xl text-xl">
          Últimos pedidos realizados
        </div>
        <Table data={lastOrders} rowsPerPage={4} />
      </div>
    </div>
  );
}

export default Index;
