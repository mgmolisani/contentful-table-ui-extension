import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import './index.css';
import Table from './components/Table';
import { TableDispatchProvider } from './contexts/TableDispatchContext';
import AddTableRowButton from './components/AddTableRowButton';
import { debounceSetValue } from './utils/fieldUtils';

const createDefaultTable = ({ headerStr, delimiter }) => {
  const headers = headerStr.split(delimiter);

  return {
    data: {
      nextId: 0,
      rows: [],
    },
    headers,
  };
};

const App = ({ extension }) => {
  const { window: xWindow, field, parameters } = extension;

  const debounceFieldSetValue = useMemo(() => debounceSetValue(field), [field]);

  const [table, setTable] = useState(
    field.getValue() || createDefaultTable(parameters.instance)
  );

  useEffect(() => debounceFieldSetValue(table, 1000), [
    debounceFieldSetValue,
    table,
  ]);

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

  useEffect(() => {
    const detachExternalChangeHandler = field.onValueChanged(table => {
      setTable(table || createDefaultTable(parameters.instance));
    });

    return () => detachExternalChangeHandler();
  }, [field, parameters.instance]);

  useEffect(() => {
    xWindow.startAutoResizer();

    return () => xWindow.stopAutoResizer();
  }, [xWindow]);

  return (
    <TableDispatchProvider dispatch={setTable}>
      <Table table={table} />
      <AddTableRowButton />
    </TableDispatchProvider>
  );
};

App.propTypes = {
  extension: PropTypes.object.isRequired,
};

init(extension => {
  // extension.field
  //   .setValue({
  //     data: {
  //       nextId: 2,
  //       rows: [
  //         {
  //           uid: 0,
  //           nextId: 2,
  //           columns: [
  //             {
  //               uid: 0,
  //               value: `this is cell 1`,
  //             },
  //             {
  //               uid: 1,
  //               value: `this is cell 2`,
  //             },
  //           ],
  //         },
  //         {
  //           uid: 1,
  //           nextId: 2,
  //           columns: [
  //             {
  //               uid: 0,
  //               value: `this is cell 1`,
  //             },
  //             {
  //               uid: 1,
  //               value: `this is cell 2`,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     headers: [`Specification`, `Value`],
  //   })
  //   .then(console.log(extension.field.getValue()));
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
