import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const DataContext = createContext(null);

export const useDataContext = useContext(DataContext);

export const DataProvider = ({ data, children }) => {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

const setTableValue = (prevData, value, row, column) => {
  const data = [...prevData];
  data[row][column] = value;

  return data;
};

// export const DataProvider = ({ field, children }) => {
//   const [data, setData] = useState(field.getValue().data);
//
//
//   const handleTableValueChange = (event, row, column) => {
//     field.setValue({
//       data: setTableValue(data, event.target.value, row, column),
//     });
//   };
//
//   return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
// };

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
};
