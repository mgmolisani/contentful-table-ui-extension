import React from 'react';
import { Table as Table36 } from '@contentful/forma-36-react-components';
import TableBody from './TableBody';
import { tablePropTypes } from '../utils/tableUtils';
import TableHeader from './TableHeader';

const Table = ({ table }) => {
  console.log(table);
  return (
    <Table36>
      <TableHeader headers={table.headers} />
      <TableBody data={table.data} />
    </Table36>
  );
};

Table.propTypes = {
  table: tablePropTypes.isRequired,
};

export default Table;
