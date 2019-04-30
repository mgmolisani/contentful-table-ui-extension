import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TableCell as TableCell36 } from '@contentful/forma-36-react-components';

const TableCell = ({ children }) => {
  return <TableCell36 className={`f36-padding--xs`}>{children}</TableCell36>;
};

TableCell.propTypes = {
  children: PropTypes.node,
};

export default memo(TableCell);
