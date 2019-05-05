import React from 'react';
import { Button } from '@contentful/forma-36-react-components';
import { useTableDispatchContext } from '../contexts/TableDispatchContext';

const AddTableRowButton = () => {
  const { addTableRow } = useTableDispatchContext();

  return (
    <Button
      buttonType={`primary`}
      className={`f36-margin-top--m`}
      icon={`Plus`}
      onClick={addTableRow}
    >
      Add New Row
    </Button>
  );
};

export default AddTableRowButton;
