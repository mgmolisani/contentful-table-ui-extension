import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {
  Button,
  Checkbox,
  IconButton,
  TextInput,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import './index.css';
import { DataProvider } from './contexts/DataContext';
import { DataDispatchProvider } from './contexts/DataDispatchContext';

const App = ({ extension }) => {
  const { window: xWindow, field } = extension;
  const [data, setData] = useState(field.getValue());

  useEffect(() => {
    xWindow.startAutoResizer();

    return () => xWindow.stopAutoResizer();
  }, [xWindow]);

  useEffect(() => {
    const detachExternalChangeHandler = field.onValueChanged(() =>
      setData(field.getValue())
    );

    return () => detachExternalChangeHandler();
  }, [field]);

  return <div />;
};

App.propTypes = {
  extension: PropTypes.object.isRequired,
};

//   createTableRow(totalCells) {
//     return (
//       <TableRow>
//         <TableCell>
//           <Checkbox
//             id="Checkbox"
//             checked
//             labelText={"some label text"}
//             name={"some-name"}
//           />
//         </TableCell>
//         {new Array(totalCells).fill(null).map((cell, index) => (
//           <TableCell key={index}>
//             <TextInput
//               type="text"
//               id="my-field-1"
//               value={this.state.value}
//               onChange={this.onChange}
//             />
//           </TableCell>
//         ))}
//         <TableCell>
//           <IconButton
//             iconProps={{
//               icon: "MoreHorizontal"
//             }}
//             buttonType={"primary"}
//             label={"Edit Row"}
//           />
//         </TableCell>
//       </TableRow>
//     );
//   }
//
//   createTable() {
//     const { delimiter, headerStr } = this.props.sdk.parameters.instance;
//     const headers = headerStr.split(delimiter);
//
//     const tableHead = (
//       <TableHead>
//         <TableRow>
//           <TableCell>
//             <Checkbox
//               id="Checkbox"
//               checked
//               labelText={"some label text"}
//               name={"some-name"}
//             />
//           </TableCell>
//           {headers.map((header, index) => (
//             <TableCell key={index}>{header}</TableCell>
//           ))}
//           <TableCell>
//             <IconButton
//               iconProps={{
//                 icon: "MoreHorizontal"
//               }}
//               buttonType={"primary"}
//               label={"Edit Selected Rows"}
//             />
//           </TableCell>
//         </TableRow>
//       </TableHead>
//     );
//
//     return (
//       <Table>
//         {tableHead}
//         <TableBody>{this.createTableRow(headers.length)}</TableBody>
//       </Table>
//     );
//   }
//
//   render() {
//     return (
//       <>
//         {this.createTable()}
//         <Button
//           icon={"Plus"}
//           buttonType={"primary"}
//           className="f36-margin-top--m"
//         >
//           Add New Row
//         </Button>
//       </>
//     );
//   }
// }

init(extension => {
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
