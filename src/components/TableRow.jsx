import React, { useMemo, memo } from 'react';
import TableCell from './TableCell';
import {
  IconButton,
  TableCell as TableCell36,
  TableRow as TableRow36,
} from '@contentful/forma-36-react-components';
import { useTableDispatchContext } from '../contexts/TableDispatchContext';
import { tableDataRowPropTypes } from '../utils/tableUtils';
import TableInput from './TableInput';

const TableRow = ({ row }) => {
  const dispatch = useTableDispatchContext();

  const onChangeHandlers = useMemo(
    () =>
      row.columns.map(column => event =>
        dispatch.updateTableCell(event.target.value, row.id, column.id)
      ),
    [dispatch, row]
  );

  return (
    <TableRow36>
      {row.columns.map((column, columnIndex) => (
        <TableCell key={column.id}>
          <TableInput
            onChange={onChangeHandlers[columnIndex]}
            value={column.value}
          />
        </TableCell>
      ))}
      <TableCell36
        className={`f36-padding--xs`}
        style={{
          verticalAlign: `middle`,
        }}
      >
        <div style={{ display: `flex` }}>
          <IconButton
            buttonType={`negative`}
            iconProps={{ icon: `Close` }}
            label={`Delete row ${row.id}`}
            onClick={() => dispatch.removeTableRow(row.id)}
          />
        </div>
      </TableCell36>
    </TableRow36>
  );
};

TableRow.propTypes = {
  row: tableDataRowPropTypes.isRequired,
};

export default memo(TableRow);
