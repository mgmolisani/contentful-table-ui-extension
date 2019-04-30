import React, { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const updateTableCell = (table, value, rowId, columnId) => {
  return {
    ...table,
    data: {
      ...table.data,
      rows: table.data.rows.map(row =>
        row.id === rowId
          ? {
              ...row,
              columns: row.columns.map(column =>
                column.id === columnId
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
      rows: table.data.rows.filter(row => row.id !== rowId),
    },
  };
};

const addTableRow = table => {
  const id = table.data.lastUsedId + 1;
  const newRow = {
    columns: table.headers.map((header, index) => ({
      id: index,
      value: ``,
    })),
    id,
    lastUsedId: table.headers.length - 1,
  };
  return {
    ...table,
    data: {
      ...table.data,
      lastUsedId: id,
      rows: [...table.data.rows, newRow],
    },
  };
};

const TableDispatchContext = createContext(null);

export const useTableDispatchContext = () => useContext(TableDispatchContext);

export const TableDispatchProvider = ({ children, dispatch }) => {
  const value = useMemo(
    () => ({
      addTableRow: () => dispatch(table => addTableRow(table)),
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
