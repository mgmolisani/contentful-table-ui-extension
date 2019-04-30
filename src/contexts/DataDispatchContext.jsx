import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const DataDispatchContext = createContext(null);

export const useDataDispatchContext = useContext(DataDispatchContext);

export const DataDispatchProvider = ({ dispatch, children }) => {
  return (
    <DataDispatchContext.Provider value={dispatch}>
      {children}
    </DataDispatchContext.Provider>
  );
};

DataDispatchProvider.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
};
