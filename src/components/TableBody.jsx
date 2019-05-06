import React from 'react';
import { TableBody as TableBody36 } from '@contentful/forma-36-react-components';
import TableRow from './TableRow';
import { tableDataPropTypes } from '../utils/tableUtils';

const TableBody = ({ data }) => {
  return (
    <TableBody36>
      {data.rows.map(row => (
        <TableRow key={row.uid} row={row} />
      ))}
    </TableBody36>
  );
};

TableBody.propTypes = {
  data: tableDataPropTypes.isRequired,
};

export default TableBody;
