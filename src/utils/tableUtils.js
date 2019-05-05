import PropTypes from 'prop-types';

export const isTableEmpty = table => !table.data.rows.length;

export const convertExcelTableData = data => {
  const rows = data.split(`\n`);
  return rows.map(row => row.split(`\t`));
};

export const addTableRows = (table, rows) => {
  let newTable = table;

  for (let i = 0; i < rows; i++) {
    const id = newTable.data.nextId;
    const newRow = {
      columns: newTable.headers.map((header, index) => ({
        id: index,
        value: ``,
      })),
      id,
      nextId: newTable.headers.length,
    };

    newTable = {
      ...newTable,
      data: {
        ...newTable.data,
        nextId: id + 1,
        rows: [...newTable.data.rows, newRow],
      },
    };
  }

  return newTable;
};

export const tableDataPointPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
});

export const tableDataRowPropTypes = PropTypes.shape({
  columns: PropTypes.arrayOf(tableDataPointPropTypes),
  id: PropTypes.number.isRequired,
  nextId: PropTypes.number.isRequired,
});

export const tableDataPropTypes = PropTypes.shape({
  nextId: PropTypes.number.isRequired,
  rows: PropTypes.arrayOf(tableDataRowPropTypes).isRequired,
});

export const tableHeaderPropTypes = PropTypes.arrayOf(PropTypes.string);

export const tablePropTypes = PropTypes.shape({
  data: tableDataPropTypes.isRequired,
  headers: tableHeaderPropTypes.isRequired,
});
