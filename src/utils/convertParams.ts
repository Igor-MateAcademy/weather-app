import _ from 'lodash';

// { key1: value1, key2: value2 } >>> 'key1: "value1", key2: "value2"'
export const convertParams = (obj: any): string => {
  const entries = Object.entries(obj);
  const params = entries.map(entry => {
    const field = entry[0];
    const value = entry[1];

    return `${field}: ${_.isNumber(value) ? value : `"${value}"`}`;
  });

  return params.join(' ,');
};
