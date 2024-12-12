import React, { useEffect } from 'react';

const TableFooter = ({ range, setPage, page, slice }: any) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [setPage, page, slice]);

  return (
    <div className="shadow-md bg-gray-50 pl-16 py-4">
      {range.map((item: number, index: number) => (
        <button
          key={index}
          className={`${
            page === item
              ? `bg-sky-500 text-white hover:bg-sky-600`
              : `bg-white hover:text-gray-500`
          } rounded mx-0.5 py-1 px-3 border border-gray-200`}
          onClick={() => setPage(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;
