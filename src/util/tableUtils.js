const copyTable = table =>
  table.map(row => {
    return [...row];
  });

export const updateTableCell = (table, value, row, column) => {
  const tableCopy = copyTable(table);
  tableCopy[row][column] = value;

  return tableCopy;
};
