import { isTableEmpty } from './tableUtils';

export const debounceSetValue = field => {
  let timeout = null;

  return (value, delay) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      isTableEmpty(value) ? field.removeValue() : field.setValue(value);
    }, delay);
  };
};
