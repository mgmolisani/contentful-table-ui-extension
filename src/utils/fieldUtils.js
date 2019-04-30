export const debounceSetValue = field => {
  let timeout = null;

  return (value, delay) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      console.log(`setting value`);
      field.setValue(value);
    }, delay);
  };
};
