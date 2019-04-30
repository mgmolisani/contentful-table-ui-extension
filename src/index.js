import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import './index.css';
import Table from './components/Table';
import { TableProvider } from './contexts/TableContext';
import { TableDispatchProvider } from './contexts/TableDispatchContext';

const createDefaultTable = ({ headerStr, delimiter }) => {
  const headers = headerStr.split(delimiter);
  const columns = headers.length;

  return {
    columns,
    data: [],
    headers,
    rows: 0,
  };
};

const App = ({ extension }) => {
  const { window: xWindow, field, parameters, dialogs } = extension;

  //const debounceFieldSetValue = useMemo(() => debounceSetValue(field), [field]);

  const [table, setTable] = useState(
    field.getValue() || createDefaultTable(parameters.instance)
  );

  // const setValue = useCallback(
  //   table => {
  //     setTable(table);
  //     return isTableEmpty(table.data)
  //       ? field.removeValue()
  //       : debounceFieldSetValue(table, 1000);
  //   },
  //   [debounceFieldSetValue, field]
  // );

  // const addTableRow = () => {
  //   const modifiedTableData = [
  //     ...copyTable(table.data),
  //     new Array(table.columns).fill(``),
  //   ];
  //
  //   return setValue({
  //     ...table,
  //     data: modifiedTableData,
  //     rows: table.rows + 1,
  //   });
  // };
  // const removeTableRow = row => {
  //   const rowNumber = row + 1;
  //
  //   return dialogs
  //     .openConfirm({
  //       confirmLabel: `Yes, delete row ${rowNumber}`,
  //       intent: `negative`,
  //       message: `Are you sure you want to delete row ${rowNumber}?`,
  //       title: `Are you sure?`,
  //     })
  //     .then(result => {
  //       if (result) {
  //         const modifiedTableData = copyTable(table.data);
  //         modifiedTableData.splice(row, 1);
  //
  //         return setValue({
  //           ...table,
  //           data: modifiedTableData,
  //           rows: table.rows - 1,
  //         });
  //       }
  //     });
  // };
  //
  // useEffect(() => {
  //   const detachExternalChangeHandler = field.onValueChanged(table => {
  //     setTable(table || defaultTable);
  //   });
  //
  //   return () => detachExternalChangeHandler();
  // }, [defaultTable, field]);

  useEffect(() => {
    xWindow.startAutoResizer();

    return () => xWindow.stopAutoResizer();
  }, [xWindow]);

  return (
    <TableDispatchProvider dispatch={setTable}>
      <Table table={table} />
      {/*<AddTableRowButton onClick={() => addTableRow(table)} />*/}
    </TableDispatchProvider>
  );
};

App.propTypes = {
  extension: PropTypes.object.isRequired,
};

init(extension => {
  extension.field
    .setValue({
      data: {
        id: 1,
        lastUsedId: 2,
        rows: [
          {
            id: 1,
            lastUsedId: 2,
            columns: [
              {
                id: 1,
                value: `this is cell 1`,
              },
              {
                id: 2,
                value: `this is cell 2`,
              },
            ],
          },
          {
            id: 2,
            lastUsedId: 2,
            columns: [
              {
                id: 1,
                value: `this is cell 1`,
              },
              {
                id: 2,
                value: `this is cell 2`,
              },
            ],
          },
        ],
      },
      headers: [`Specification`, `Value`],
    })
    .then(console.log(extension.field.getValue()));
  ReactDOM.render(
    <App extension={extension} />,
    document.getElementById(`root`)
  );
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
if (module.hot) {
  module.hot.accept();
}
