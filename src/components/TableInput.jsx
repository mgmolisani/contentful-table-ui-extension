import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '@contentful/forma-36-react-components';

const TableInput = ({ value, onChange, onPaste }) => {
  return (
    <TextInput
      onChange={onChange}
      onPaste={onPaste}
      type={`text`}
      value={value}
    />
  );
};

TableInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onPaste: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default memo(TableInput);
