import PropTypes from 'prop-types';

export const isTableEmpty = table => !table.data.rows.length;

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
