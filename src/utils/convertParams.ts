// { key1: value1, key2: value2 } >>> 'key1: "value1", key2: "value2"'
export const convertParams = (obj: any): string => {
  const entries = Object.entries(obj);
  const params = entries.map(entry => `${entry[0]}: "${entry[1]}"`).join(' ,');

  return params;
};
