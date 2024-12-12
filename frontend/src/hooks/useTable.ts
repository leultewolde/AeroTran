import { useState, useEffect } from 'react';

const calculateRange = (data: any[], rowsPerPage: number): number[] => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  for (let i = 1; i < num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (data: any[], page: number, rowsPerPage: number): any[] => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

const useTable = (data: any[], page: any, rowsPerPage: number) => {
  const [tableRange, setTableRange] = useState<number[]>([]);
  const [slice, setSlice] = useState<any[]>([]);

  useEffect(() => {
    const range = calculateRange(data, rowsPerPage);
    setTableRange([...range]);

    const slice = sliceData(data, page, rowsPerPage);
    setSlice([...slice]);
  }, [data, setTableRange, page, setSlice, rowsPerPage]);

  return { slice, range: tableRange };
};

export default useTable;
