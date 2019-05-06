import React, { memo, useMemo } from 'react';
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
  const {
    pasteTableData,
    updateTableCell,
    removeTableRow,
  } = useTableDispatchContext();

  const onChangeHandlers = useMemo(
    () =>
      row.columns.map(column => event => {
        event.preventDefault();
        updateTableCell(event.target.value, row.uid, column.uid);
      }),
    [row.columns, row.uid, updateTableCell]
  );

  const onPasteHandlers = useMemo(
    () =>
      row.columns.map(column => event => {
        event.preventDefault();
        pasteTableData(
          event.clipboardData.getData(`text/plain`),
          row.uid,
          column.uid
        );
      }),
    [pasteTableData, row.columns, row.uid]
  );

  return (
    <TableRow36>
      {row.columns.map((column, columnIndex) => (
        <TableCell key={column.uid}>
          <TableInput
            onChange={onChangeHandlers[columnIndex]}
            onPaste={onPasteHandlers[columnIndex]}
            value={column.value}
          />
        </TableCell>
      ))}
      <TableCell36
        className={`f36-padding--xs`}
        style={{
          userSelect: `none`,
          verticalAlign: `middle`,
        }}
      >
        <div style={{ display: `flex` }}>
          <IconButton
            buttonType={`negative`}
            iconProps={{ icon: `Close` }}
            label={`Delete row ${row.uid}`}
            onClick={() => removeTableRow(row.uid)}
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
