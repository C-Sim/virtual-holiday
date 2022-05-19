//LOCAL STORAGE

const holidaySnapsObjects = [
  {
    label: "Temperature",
    key: 30,
  },
  {
    label: "Song",
    key: 22,
  },
];

const objectsString = JSON.stringify(holidaySnapsObjects);

localStorage.setItem("objectsString", objectsString);

const objectsParse = JSON.parse(localStorage.getItem("objectsString"));

console.log(objectsParse);

// const writeToLocalStorage = (key, value) => {
//   // stringify object value
//   const stringifiedValue = JSON.stringify(value);
//   // set value for each key within LS
//   localStorage.setItem(key, stringifiedValue);
// };
