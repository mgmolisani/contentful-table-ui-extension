import React, { createContext } from "react";
import PropTypes from "prop-types";

const JSONContext = createContext(null);

export const JSONProvider = ({ value }) => {
  return <JSONContext.Provider value={value}>{children}</JSONContext.Provider>;
};

JSONProvider.propTypes = {
  value: PropTypes.object,
  children: PropTypes.node.isRequired
};
