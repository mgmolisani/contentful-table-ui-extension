import React, { memo } from 'react';
import {
  TableCell as TableCell36,
  TableHead as TableHead36,
  TableRow as TableRow36,
} from '@contentful/forma-36-react-components';
import { tableHeaderPropTypes } from '../utils/tableUtils';

const TableHeader = ({ headers }) => {
  return (
    <TableHead36>
      <TableRow36>
        {headers.map((header, index) => (
          <TableCell36 key={index}>{header}</TableCell36>
        ))}
        <TableCell36 />
      </TableRow36>
    </TableHead36>
  );
};

TableHeader.propTypes = {
  headers: tableHeaderPropTypes.isRequired,
};

export default memo(TableHeader);
