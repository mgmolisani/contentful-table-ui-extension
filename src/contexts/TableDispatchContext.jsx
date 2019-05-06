import React, { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { addTableRows, convertExcelTableData } from '../utils/tableUtils';

const pasteTableData = (table, data, rowId, columnId) => {
  const convertedData = convertExcelTableData(data);
  const numRowsPasted = convertedData.length;
  const numColumnsPasted = convertedData[0].length;
  const currentNumRows = table.data.rows.length;

  const rowOffset = table.data.rows.findIndex(row => row.uid === rowId);
  const columnOffset = table.data.rows[rowOffset].columns.findIndex(
    column => column.uid === columnId
  );

  let newTable = table;

  const numRowsToAdd = numRowsPasted + rowOffset - currentNumRows;

  if (numRowsToAdd > 0) {
    newTable = addTableRows(newTable, numRowsToAdd);
  }

  return {
    ...newTable,
    data: {
      ...newTable.data,
      rows: newTable.data.rows.map((row, rowIndex) =>
        rowIndex >= rowOffset && rowIndex < rowOffset + numRowsPasted
          ? {
              ...row,
              columns: row.columns.map((column, columnIndex) =>
                columnIndex >= columnOffset &&
                columnIndex < columnOffset + numColumnsPasted
                  ? {
                      ...column,
                      value:
                        convertedData[rowIndex - rowOffset][
                          columnIndex - columnOffset
                        ],
                    }
                  : column
              ),
            }
          : row
      ),
    },
  };
};

const updateTableCell = (table, value, rowId, columnId) => {
  return {
    ...table,
    data: {
      ...table.data,
      rows: table.data.rows.map(row =>
        row.uid === rowId
          ? {
              ...row,
              columns: row.columns.map(column =>
                column.uid === columnId
                  ? {
                      ...column,
                      value,
                    }
                  : column
              ),
            }
          : row
      ),
    },
  };
};

const removeTableRow = (table, rowId) => {
  return {
    ...table,
    data: {
      ...table.data,
      rows: table.data.rows.filter(row => row.uid !== rowId),
    },
  };
};

const addTableRow = table => {
  return addTableRows(table, 1);
};

const TableDispatchContext = createContext(null);

export const useTableDispatchContext = () => useContext(TableDispatchContext);

export const TableDispatchProvider = ({ children, dispatch }) => {
  const value = useMemo(
    () => ({
      addTableRow: () => dispatch(table => addTableRow(table)),
      pasteTableData: (value, rowId, columnId) =>
        dispatch(table => pasteTableData(table, value, rowId, columnId)),
      removeTableRow: rowId => dispatch(table => removeTableRow(table, rowId)),
      updateTableCell: (value, rowId, columnId) =>
        dispatch(table => updateTableCell(table, value, rowId, columnId)),
    }),
    [dispatch]
  );

  return (
    <TableDispatchContext.Provider value={value}>
      {children}
    </TableDispatchContext.Provider>
  );
};

TableDispatchProvider.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
};
