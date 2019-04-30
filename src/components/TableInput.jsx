import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '@contentful/forma-36-react-components';

const TableInput = ({ value, onChange }) => {
  return <TextInput onChange={onChange} type={`text`} value={value} />;
};

TableInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default TableInput;
