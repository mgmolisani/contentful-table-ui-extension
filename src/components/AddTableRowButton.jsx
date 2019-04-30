import React from 'react';
import { Button } from '@contentful/forma-36-react-components';
import PropTypes from 'prop-types';

const AddTableRowButton = ({ onClick }) => {
  return (
    <Button
      buttonType={`primary`}
      className={`f36-margin-top--m`}
      icon={`Plus`}
      onClick={onClick}
    >
      Add New Row
    </Button>
  );
};

AddTableRowButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddTableRowButton;
