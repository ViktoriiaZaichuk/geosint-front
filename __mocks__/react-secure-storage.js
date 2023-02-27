let store = {};

export const storeData = (key, value) => {
  store[key] = value;
};

export const getData = (key) => {
  return store[key];
};