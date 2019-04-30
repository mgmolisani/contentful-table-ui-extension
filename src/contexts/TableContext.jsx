import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { tablePropTypes } from '../utils/tableUtils';

const TableContext = createContext(null);

export const useTableContext = () => useContext(TableContext);

export const TableProvider = ({ children, table }) => {
  return (
    <TableContext.Provider value={table}>{children}</TableContext.Provider>
  );
};

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
  table: tablePropTypes.isRequired,
};
