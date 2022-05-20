const readFromLocalStorage = (key, defaultValue) => {
  //get from LS with key name
  const dataFromLS = localStorage.getItem(key);

  //parse data
  const parsedData = JSON.parse(dataFromLS);

  if (parsedData) {
    return parsedData;
  } else {
    return defaultValue;
  }
};

const writeToLocalStorage = (key, value) => {
  //value turned to string
  const stringifiedValue = JSON.stringify(value);

  localStorage.setItem(key, stringifiedValue);
};
