import React, { useState } from 'react';

import useTable from '@/hooks/useTable';
import TableFooter from './TableFooter';

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  return (
    <>
      <table className="shadow-xl w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3">
              Pedido
            </th>
            <th scope="col" className="px-6 py-3">
              Data e Horário
            </th>
            <th scope="col" className="px-6 py-3">
              Produtos
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3">
              Comprador
            </th>
            <th scope="col" className="px-6 py-3">
              Status do Pedido
            </th>
            <th scope="col" className="px-6 py-3">
              Ação Recomendada
            </th>
          </tr>
        </thead>
        <tbody>
          {slice.map((order, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0
                  ? `bg-white border-b border-gray-100`
                  : `bg-gray-50 border-b border-gray-100`
              }
            >
              <td className="px-6 py-4">{order.orderId}</td>
              <td className="px-6 py-4">{order.orderDate}</td>
              <td className="px-6 py-4">
                <span className="font-medium text-sky-500 dark:text-sky-600 hover:underline">
                  Ver quantidade
                </span>
              </td>
              <td className="px-6 py-4">R$ {order.totalPrice}</td>
              <td className="px-6 py-4">{order.buyer}</td>
              <td className="px-6 py-4">{order.status[0]}</td>
              <td className="px-6 py-1.5">
                <button
                  type="button"
                  className="inline-block w-full py-2.5 bg-sky-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-600 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  {order.status[1]}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
